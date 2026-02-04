-- 1. Create the contact_messages table
create table public.contact_messages (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  full_name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean not null default false,
  constraint contact_messages_pkey primary key (id)
);

-- 2. Enable Row Level Security (RLS)
alter table public.contact_messages enable row level security;

-- 3. Create Policy: Allow anyone (Anon) to INSERT messages (Submit Form)
-- This allows the public contact form to work.
create policy "Allow public to insert messages"
on public.contact_messages
for insert
to anon
with check (true);

-- 4. Create Policy: Allow Admins to SELECT (Read) messages (Dashboard)
-- This assumes you have an 'admin' role in your custom 'User' table or metadata,
-- BUT for simplicity with standard Supabase Auth, we often check if the user is authenticated.
-- If you have a specific 'admin' role check, replace the using clause.
-- For now, we'll allow any AUTHENTICATED user to read (assuming only admins log in).
create policy "Allow authenticated users to view messages"
on public.contact_messages
for select
to authenticated
using (true);

-- Optional: Allow Admins to UPDATE (Mark as read)
create policy "Allow authenticated users to update messages"
on public.contact_messages
for update
to authenticated
using (true);
