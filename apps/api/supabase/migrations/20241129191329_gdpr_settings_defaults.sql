-- Insert default GDPR settings for existing users
INSERT INTO gdpr_settings (user_id, essential_data_collection, analytics_improvements)
SELECT id, TRUE, FALSE
FROM public.users
WHERE id NOT IN (SELECT user_id FROM gdpr_settings);

-- Function to insert default GDPR settings for new users
CREATE OR REPLACE FUNCTION create_default_gdpr_settings()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO gdpr_settings (user_id, essential_data_collection, analytics_improvements)
    VALUES (NEW.id, TRUE, FALSE);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function after a new user is inserted
CREATE TRIGGER trigger_create_default_gdpr_settings
AFTER INSERT ON public.users
FOR EACH ROW
EXECUTE FUNCTION create_default_gdpr_settings();