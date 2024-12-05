-- Create the email_notification_preferences table
CREATE TABLE email_notification_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    marketing_emails BOOLEAN NOT NULL DEFAULT FALSE,
    security_alerts BOOLEAN NOT NULL DEFAULT TRUE,
    product_updates BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Ensure the updated_at field is updated automatically
CREATE TRIGGER update_email_notification_preferences_updated_at
BEFORE UPDATE ON email_notification_preferences
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Enable RLS on the email_notification_preferences table
ALTER TABLE email_notification_preferences ENABLE ROW LEVEL SECURITY;

-- Define RLS policies
-- Policy to allow users to view their own email notification preferences
CREATE POLICY select_own_email_preferences ON email_notification_preferences
    FOR SELECT USING (user_id = auth.uid());

-- Policy to allow users to insert their own email notification preferences
CREATE POLICY insert_own_email_preferences ON email_notification_preferences
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Policy to allow users to update their own email notification preferences
CREATE POLICY update_own_email_preferences ON email_notification_preferences
    FOR UPDATE USING (user_id = auth.uid());

-- Policy to allow users to delete their own email notification preferences
CREATE POLICY delete_own_email_preferences ON email_notification_preferences
    FOR DELETE USING (user_id = auth.uid());

-- Grant select, insert, update, and delete permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON email_notification_preferences TO authenticated;
