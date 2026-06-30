import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const FIREBASE_PROJECT_ID = Deno.env.get('FIREBASE_PROJECT_ID')!;

async function getAccessToken(serviceAccount: Record<string, string>): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/firebase.messaging',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const encode = (obj: object) =>
    btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const signingInput = `${encode(header)}.${encode(payload)}`;

  const privateKeyPem = serviceAccount.private_key
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\n/g, '');

  const binaryKey = Uint8Array.from(atob(privateKeyPem), c => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const jwt = `${signingInput}.${sigB64}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const record = body.record;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const { data: tokens, error } = await supabase
      .from('fcm_tokens')
      .select('token');

    if (error || !tokens?.length) {
      console.log('[FCM] No tokens found or error:', error);
      return new Response('No tokens', { status: 200 });
    }

    const serviceAccount = JSON.parse(Deno.env.get('FIREBASE_SERVICE_ACCOUNT_JSON')!);
    const accessToken = await getAccessToken(serviceAccount);

    const fcmUrl = `https://fcm.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/messages:send`;

    const messageBody = `From: ${record.name || 'Unknown'} · ${record.subject || 'New request'}`;

    // fetch() only rejects on network errors — an invalid token still resolves
    // with an HTTP 4xx. So inspect each response explicitly: count real
    // successes and collect dead tokens (UNREGISTERED / INVALID_ARGUMENT) to prune.
    let succeeded = 0;
    const invalidTokens: string[] = [];

    await Promise.all(
      tokens.map(async ({ token }) => {
        try {
          const res = await fetch(fcmUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: {
                token,
                // Data-only — NO "notification" field. FCM won't auto-display
                // anything; the service worker calls showNotification()
                // exclusively, so there is exactly one notification regardless
                // of tab state.
                data: {
                  title: 'Acezon — New Order!',
                  body: messageBody,
                  url: 'https://www.acezon.app/admin',
                },
                webpush: {
                  // Collapses notifications by key (replaces the previous one).
                  headers: { Topic: 'new-order' },
                },
              },
            }),
          });

          if (res.ok) {
            succeeded++;
            return;
          }

          const errBody = await res.json().catch(() => null);
          const fcmStatus = errBody?.error?.status;
          if (res.status === 404 || fcmStatus === 'UNREGISTERED' || fcmStatus === 'INVALID_ARGUMENT') {
            invalidTokens.push(token);
          } else {
            console.error('[FCM] Send failed:', res.status, fcmStatus ?? '');
          }
        } catch (err) {
          console.error('[FCM] Send error:', err);
        }
      })
    );

    // Prune dead tokens so the table stays clean and we stop paying for them.
    if (invalidTokens.length) {
      await supabase.from('fcm_tokens').delete().in('token', invalidTokens);
      console.log(`[FCM] Pruned ${invalidTokens.length} invalid token(s)`);
    }

    console.log(`[FCM] Sent to ${succeeded}/${tokens.length} devices`);

    return new Response(
      JSON.stringify({ sent: succeeded, total: tokens.length, pruned: invalidTokens.length }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('[FCM] Edge function error:', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
