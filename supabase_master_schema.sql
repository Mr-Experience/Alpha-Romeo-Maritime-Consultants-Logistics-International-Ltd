-- MASTER SUPABASE SCHEMA
-- This file contains all the table definitions and RLS policies for the Romeo Alpha Maritime project.

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROMOTIONAL ADS TABLE
CREATE TABLE IF NOT EXISTS promotional_ads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    link_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE promotional_ads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON promotional_ads FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access" ON promotional_ads FOR ALL USING (auth.role() = 'authenticated');

-- 3. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid (),
  created_at timestamp WITH time zone NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT contact_messages_pkey PRIMARY KEY (id)
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to insert messages" ON public.contact_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow authenticated users to view messages" ON public.contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (true);

-- 4. FAQS TABLE
CREATE TABLE IF NOT EXISTS faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access for faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated');

-- 5. MARKETPLACE ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.marketplace_items (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('sale', 'hire', 'repair', 'scrap')),
    price TEXT,
    image_url TEXT,
    location TEXT,
    specs jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to view marketplace items" ON public.marketplace_items FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Allow authenticated users to manage marketplace items" ON public.marketplace_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. NEWSLETTER SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid (),
  created_at timestamp WITH time zone NOT NULL DEFAULT now(),
  email TEXT NOT NULL,
  CONSTRAINT newsletter_subscriptions_pkey PRIMARY KEY (id)
);

ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to subscribe" ON public.newsletter_subscriptions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow authenticated users to view subscriptions" ON public.newsletter_subscriptions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete subscriptions" ON public.newsletter_subscriptions FOR DELETE TO authenticated USING (true);

-- 7. PARTNERSHIP PROPOSALS TABLE
CREATE TABLE IF NOT EXISTS partnership_proposals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_name TEXT NOT NULL,
    representative_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service_interest TEXT,
    message TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE partnership_proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for partnership_proposals" ON partnership_proposals FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated full access for partnership_proposals" ON partnership_proposals FOR ALL USING (auth.role() = 'authenticated');

-- 8. SITE INFO TABLE (Global Config & Text)
CREATE TABLE IF NOT EXISTS public.site_info (
  id uuid NOT NULL DEFAULT gen_random_uuid (),
  created_at timestamp WITH time zone NOT NULL DEFAULT now(),
  info_key TEXT NOT NULL UNIQUE,
  info_value TEXT,
  info_label TEXT,
  CONSTRAINT site_info_pkey PRIMARY KEY (id)
);

ALTER TABLE public.site_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to view site info" ON public.site_info FOR SELECT TO anon USING (true);
CREATE POLICY "Allow authenticated users to manage site info" ON public.site_info FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insert default site info keys if they don't exist
INSERT INTO public.site_info (info_key, info_label, info_value) 
VALUES
('primary_phone', 'Primary Phone', '+234 806 618 4330'),
('secondary_phone', 'Secondary Phone', '+234 805 576 9660'),
('primary_email', 'Primary Email', 'info@romeoalphamaritime.com'),
('secondary_email', 'Secondary Email', 'kyoyan99@yahoo.com'),
('office_address', 'Office Address', 'Portharcourt, Nigeria'),
('Notice Welcome', 'Top Banner Notice', 'Welcome to Romeo Alpha Maritime Consultants & Logistics International Ltd'),
('Hero Heading', 'Hero Main Heading', 'Powering Maritime Transportation and Offshore Operations'),
('Hero Subheading', 'Hero Subheading', 'Delivering safe and reliable shipping, marine security escort services, and offshore oil and gas support across coastal and international waters'),
('Content Heading', 'Home Section Heading', 'Our Shipping and Logistics Solutions for every needs'),
('Content Subtext', 'Home Section Description', 'We provide integrated maritime transportation and offshore support services. From cargo shipping to vessel management, we offer safe, efficient, and reliable solutions.'),
('Banner Heading', 'Bottom Call-to-Action Heading', 'Let’s Do Business Together'),
('Banner Subtext', 'Bottom CTA Description', 'Partner with us on all maritime transportation, operations and security solution across coastal and international waters worldwide.'),
('Banner Button', 'Bottom CTA Button Text', 'Partner with us today')
ON CONFLICT (info_key) DO NOTHING;

-- 9. STAFF TEAM TABLE
CREATE TABLE IF NOT EXISTS public.staff_team (
  id uuid NOT NULL DEFAULT gen_random_uuid (),
  created_at timestamp WITH time zone NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  CONSTRAINT staff_team_pkey PRIMARY KEY (id)
);

ALTER TABLE public.staff_team ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to view team" ON public.staff_team FOR SELECT TO anon USING (true);
CREATE POLICY "Allow authenticated users to manage team" ON public.staff_team FOR ALL TO authenticated USING (true) WITH CHECK (true);
