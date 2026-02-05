create table public.site_info (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  info_key text not null unique,
  info_value text,
  info_label text,
  constraint site_info_pkey primary key (id)
);

alter table public.site_info enable row level security;

create policy "Allow public to view site info"
on public.site_info
for select
to anon
using (true);

create policy "Allow authenticated users to manage site info"
on public.site_info
for all
to authenticated
using (true)
with check (true);

-- Insert default keys
insert into public.site_info (info_key, info_label, info_value) values
('primary_phone', 'Primary Phone', '+234 806 618 4330'),
('secondary_phone', 'Secondary Phone', '+234 805 576 9660'),
('primary_email', 'Primary Email', 'info@romeoalphamaritime.com'),
('secondary_email', 'Secondary Email', 'kyoyan99@yahoo.com'),
('office_address', 'Office Address', 'Portharcourt, Nigeria');
