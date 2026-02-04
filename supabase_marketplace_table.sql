-- Create Marketplace Items Table
create table public.marketplace_items (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    category text not null check (category in ('sale', 'hire', 'repair', 'scrap')),
    price text, -- Price can be a string like "$1,000,000" or "Contact for Price"
    image_url text,
    location text,
    specs jsonb, -- Flexible field for technical specifications
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.marketplace_items enable row level security;

-- Policies
-- 1. Allow Anyone to View active items
create policy "Allow public to view marketplace items"
on public.marketplace_items
for select
to anon, authenticated
using (is_active = true);

-- 2. Allow Admins (authenticated) to manage items
create policy "Allow authenticated users to manage marketplace items"
on public.marketplace_items
for all
to authenticated
using (true)
with check (true);
