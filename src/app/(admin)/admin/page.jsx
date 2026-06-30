import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  // getUser() validates the JWT against the Supabase auth server, unlike
  // getSession() which trusts the (potentially spoofable) cookie payload.
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return <AdminDashboard initialEmail={user.email} />;
}
