create table public.staff_team (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  name text not null,
  role text not null,
  bio text,
  image_url text,
  display_order int default 0,
  constraint staff_team_pkey primary key (id)
);

alter table public.staff_team enable row level security;

create policy "Allow public to view team"
on public.staff_team
for select
to anon
using (true);

create policy "Allow authenticated users to manage team"
on public.staff_team
for all
to authenticated
using (true)
with check (true);
