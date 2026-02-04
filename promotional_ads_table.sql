-- Create promotional_ads table
CREATE TABLE promotional_ads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    link_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE promotional_ads ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON promotional_ads
    FOR SELECT USING (true);

-- Allow authenticated users (Admins) to manage ads
CREATE POLICY "Allow authenticated full access" ON promotional_ads
    FOR ALL USING (auth.role() = 'authenticated');
