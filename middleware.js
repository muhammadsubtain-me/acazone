import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Validate JWT with Supabase auth server — same as admin page.jsx.
  const { data: { user } } = await supabase.auth.getUser();

  if (pathname === '/admin' && !user) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (pathname === '/admin/login' && user) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin', '/admin/login'],
};
