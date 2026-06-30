import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import LoginGateClient from './LoginGateClient';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();
  // getUser() validates the JWT with the auth server (getSession() only reads
  // the cookie), so the redirect-when-authenticated check is trustworthy.
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/admin');
  }

  return <LoginGateClient />;
}
