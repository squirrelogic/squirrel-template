-- Create the push_notification_settings table
CREATE TABLE push_notification_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    comments_and_mentions BOOLEAN NOT NULL DEFAULT TRUE,
    account_activity BOOLEAN NOT NULL DEFAULT TRUE,
    news_and_updates BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Ensure the updated_at field is updated automatically
CREATE TRIGGER update_push_notification_settings_updated_at
BEFORE UPDATE ON push_notification_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Enable RLS on the push_notification_settings table
ALTER TABLE push_notification_settings ENABLE ROW LEVEL SECURITY;

-- Define RLS policies
-- Policy to allow users to view their own push notification settings
CREATE POLICY select_own_push_notification_settings ON push_notification_settings
    FOR SELECT USING (user_id = auth.uid());

-- Policy to allow users to insert their own push notification settings
CREATE POLICY insert_own_push_notification_settings ON push_notification_settings
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Policy to allow users to update their own push notification settings
CREATE POLICY update_own_push_notification_settings ON push_notification_settings
    FOR UPDATE USING (user_id = auth.uid());

-- Policy to allow users to delete their own push notification settings
CREATE POLICY delete_own_push_notification_settings ON push_notification_settings
    FOR DELETE USING (user_id = auth.uid());

-- Grant select, insert, update, and delete permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON push_notification_settings TO authenticated;
