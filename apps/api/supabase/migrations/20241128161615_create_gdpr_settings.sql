-- Create the gdpr_settings table
CREATE TABLE gdpr_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    essential_data_collection BOOLEAN NOT NULL DEFAULT FALSE,
    analytics_improvements BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Ensure the updated_at field is updated automatically
CREATE TRIGGER update_gdpr_settings_updated_at
BEFORE UPDATE ON gdpr_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Enable RLS on the gdpr_settings table
ALTER TABLE gdpr_settings ENABLE ROW LEVEL SECURITY;

-- Define RLS policies
-- Policy to allow users to view their own GDPR settings
CREATE POLICY select_own_gdpr_settings ON gdpr_settings
    FOR SELECT USING (user_id = auth.uid());

-- Policy to allow users to insert their own GDPR settings
CREATE POLICY insert_own_gdpr_settings ON gdpr_settings
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Policy to allow users to update their own GDPR settings
CREATE POLICY update_own_gdpr_settings ON gdpr_settings
    FOR UPDATE USING (user_id = auth.uid());

-- Policy to allow users to delete their own GDPR settings
CREATE POLICY delete_own_gdpr_settings ON gdpr_settings
    FOR DELETE USING (user_id = auth.uid());

-- Grant select, insert, update, and delete permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON gdpr_settings TO authenticated;
