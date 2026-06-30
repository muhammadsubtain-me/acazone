import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { checkWhatsAppNumber, toWhapiContact } from '@/lib/whapi';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(30, '1 h'),
  analytics: true,
  prefix: 'acezon:whapi-validate',
});

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || '127.0.0.1';
}

export async function POST(request) {
  const ip = getClientIp(request);

  if (process.env.DISABLE_RATE_LIMIT !== 'true') {
    const { success, limit, remaining, reset } = await ratelimit.limit(ip);
    if (!success) {
      const minutesLeft = Math.ceil((reset - Date.now()) / 60000);
      return NextResponse.json(
        {
          error: `Too many verification attempts. Please try again in ${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''}.`,
          retryAfter: reset,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': String(remaining),
            'X-RateLimit-Reset': String(reset),
            'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
          },
        }
      );
    }
  }

  if (!process.env.WHAPI_TOKEN) {
    return NextResponse.json(
      { error: 'WhatsApp verification is not available right now.' },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { phone, country_dial } = body;
  const contact = toWhapiContact(country_dial, phone);

  if (!contact) {
    return NextResponse.json(
      { valid: false, error: 'Please enter a valid phone / WhatsApp number.' },
      { status: 400 }
    );
  }

  const result = await checkWhatsAppNumber(contact);

  if (!result.configured) {
    return NextResponse.json(
      { error: 'WhatsApp verification is not available right now.' },
      { status: 503 }
    );
  }

  if (result.valid) {
    return NextResponse.json({ valid: true }, { status: 200 });
  }

  if (result.serviceError) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json(
    { valid: false, error: result.error },
    { status: 400 }
  );
}

export function GET()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function PUT()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function DELETE() { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
