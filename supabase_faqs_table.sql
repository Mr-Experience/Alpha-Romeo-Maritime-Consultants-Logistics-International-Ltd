-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read for faqs" 
ON faqs FOR SELECT 
USING (true);

-- Allow authenticated users (admin) to manage
CREATE POLICY "Allow authenticated full access for faqs" 
ON faqs FOR ALL 
USING (auth.role() = 'authenticated');
