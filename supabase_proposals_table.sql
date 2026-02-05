-- Create partnership_proposals table
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

-- Enable RLS
ALTER TABLE partnership_proposals ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
CREATE POLICY "Allow public insert for partnership_proposals" 
ON partnership_proposals FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users (admin) to read/manage
CREATE POLICY "Allow authenticated full access for partnership_proposals" 
ON partnership_proposals FOR ALL 
USING (auth.role() = 'authenticated');
