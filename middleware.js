import { NextResponse } from 'next/server';
import { createSupabaseMiddlewareClient } from '@/lib/supabase-server';

export async function middleware(request) {
  const response = NextResponse.next();

  const supabase = createSupabaseMiddlewareClient(request, response);

  // Refresh session if expired — keeps user logged in
  const { data: { session } } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  // Protect /admin — redirect to /admin if no session
  if (pathname.startsWith('/admin') && !session) {
    const loginUrl = new URL('/admin', request.url);
    loginUrl.searchParams.set('unauthorized', '1');
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
