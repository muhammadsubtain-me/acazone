-- Acezon Supabase schema
-- Run this in the Supabase SQL Editor after creating the `inquiry-files` storage bucket.

drop table if exists public.inquiries cascade;

drop policy if exists "Allow public uploads" on storage.objects;
drop policy if exists "Allow public read" on storage.objects;
drop policy if exists "Allow authenticated full access" on storage.objects;

create table public.inquiries (
  id uuid default gen_random_uuid() primary key,
  submitted_at timestamptz not null default now(),
  name text,
  phone text,
  country_dial text,
  country_iso text,
  country_name text,
  domain_id text,
  service_id text,
  custom_service text,
  subject text,
  description text,
  status text not null default 'new' check (status in ('new', 'claimed', 'in_progress', 'completed')),
  claimed_by text,
  claimed_at timestamptz,
  completed_at timestamptz,
  notes text not null default '',
  attachments text[] not null default '{}'
);

alter table public.inquiries enable row level security;

create policy "Allow insert" on public.inquiries
  for insert to anon
  with check (true);

create policy "Allow all for authenticated" on public.inquiries
  for all to authenticated
  using (true)
  with check (true);

-- Required for Supabase Realtime postgres_changes subscriptions.
alter publication supabase_realtime add table public.inquiries;

create policy "Allow public uploads" on storage.objects
  for insert to public
  with check (bucket_id = 'inquiry-files');

create policy "Allow public read" on storage.objects
  for select to public
  using (bucket_id = 'inquiry-files');

create policy "Allow authenticated full access" on storage.objects
  for all to authenticated
  using (bucket_id = 'inquiry-files')
  with check (bucket_id = 'inquiry-files');
