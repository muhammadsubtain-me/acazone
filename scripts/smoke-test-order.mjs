/**
 * Smoke test: order page + signed upload + submit-order flow.
 * Run while `npm run dev` is up on localhost:3000.
 */
import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const BASE = process.env.SMOKE_BASE_URL || 'http://localhost:3000';

// Load .env.local for the upload step (server already has these via Next.js)
const envText = readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(
  envText
    .split('\n')
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .map((line) => {
      const i = line.indexOf('=');
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    })
);

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const results = [];

function pass(name, detail = '') {
  results.push({ name, ok: true, detail });
  console.log(`✓ ${name}${detail ? ` — ${detail}` : ''}`);
}

function fail(name, detail = '') {
  results.push({ name, ok: false, detail });
  console.error(`✗ ${name}${detail ? ` — ${detail}` : ''}`);
}

async function expectStatus(label, url, init, expected) {
  const res = await fetch(url, init);
  const body = await res.text();
  let json;
  try { json = JSON.parse(body); } catch { json = body.slice(0, 120); }
  if (res.status === expected) {
    pass(label, `HTTP ${res.status}`);
    return { res, json };
  }
  fail(label, `expected ${expected}, got ${res.status}: ${JSON.stringify(json)}`);
  return { res, json };
}

async function main() {
  console.log(`\nSmoke test → ${BASE}\n`);

  // 1. Order page loads
  const pageRes = await fetch(`${BASE}/order`);
  if (pageRes.ok && (await pageRes.text()).includes('Submit Request')) {
    pass('GET /order', `HTTP ${pageRes.status}`);
  } else {
    fail('GET /order', `HTTP ${pageRes.status}`);
  }

  // 2. Method guards
  await expectStatus(
    'GET /api/create-upload-url → 405',
    `${BASE}/api/create-upload-url`,
    { method: 'GET' },
    405
  );

  // 3. Invalid upload metadata → 400
  await expectStatus(
    'POST create-upload-url invalid type → 400',
    `${BASE}/api/create-upload-url`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        files: [{ name: 'bad.exe', size: 100, type: 'application/x-msdownload' }],
      }),
    },
    400
  );

  // 4. Valid signed URL minting
  const { json: uploadJson } = await expectStatus(
    'POST create-upload-url valid PDF → 200',
    `${BASE}/api/create-upload-url`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        files: [{ name: 'smoke-test.pdf', size: 512, type: 'application/pdf' }],
      }),
    },
    200
  );

  if (!uploadJson?.uploads?.[0]?.path || !uploadJson?.uploads?.[0]?.token) {
    fail('Signed URL payload shape', JSON.stringify(uploadJson));
  } else {
    pass('Signed URL payload shape', `path=${uploadJson.uploads[0].path}`);

    // 5. Upload tiny PDF bytes via signed URL (same as OrderClient)
    const pdfBytes = Buffer.from('%PDF-1.4 smoke test\n');
    const { path, token } = uploadJson.uploads[0];
    const { error: uploadError } = await supabase.storage
      .from('inquiry-files')
      .uploadToSignedUrl(path, token, pdfBytes, { contentType: 'application/pdf' });

    if (uploadError) {
      fail('uploadToSignedUrl', uploadError.message);
    } else {
      pass('uploadToSignedUrl', path);

      // 6. Submit order with uploaded path
      const { json: orderJson } = await expectStatus(
        'POST submit-order with attachment → 200',
        `${BASE}/api/submit-order`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            submitted_at: new Date().toISOString(),
            name: 'Smoke Test',
            phone: '3001234567',
            country_dial: '+92',
            country_iso: 'pk',
            country_name: 'Pakistan',
            domain_id: 'engineering',
            service_id: 'assignment',
            custom_service: '',
            subject: 'Smoke Test Subject',
            description: 'Automated smoke test submission — safe to delete.',
            attachments: [path],
          }),
        },
        200
      );

      if (orderJson?.success) pass('submit-order success flag');
      else fail('submit-order success flag', JSON.stringify(orderJson));
    }
  }

  // 7. submit-order validation (no DB write needed if invalid)
  await expectStatus(
    'POST submit-order invalid attachments → 400',
    `${BASE}/api/submit-order`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Smoke Test',
        phone: '3001234567',
        domain_id: 'engineering',
        service_id: 'assignment',
        subject: 'Test',
        description: 'Valid description here.',
        attachments: ['../evil.pdf'],
      }),
    },
    400
  );

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed\n`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((err) => {
  console.error('Smoke test crashed:', err);
  process.exit(1);
});
