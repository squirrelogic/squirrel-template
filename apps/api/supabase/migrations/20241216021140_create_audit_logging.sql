
-- Create Audit Log Table

CREATE TABLE public.audit_log (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(100),
    operation VARCHAR(10),
    old_data JSONB,
    new_data JSONB,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by TEXT
);

-- Create Audit Logging Function

CREATE OR REPLACE FUNCTION log_audit_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.audit_log (table_name, operation, old_data, new_data, changed_by)
    VALUES (
        TG_TABLE_NAME,
        TG_OP,
        to_jsonb(OLD),
        to_jsonb(NEW),
        current_user
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create Triggers for Audit Logging

-- CREATE TRIGGER audit_<table>
-- AFTER INSERT OR UPDATE OR DELETE ON public.<table>
-- FOR EACH ROW
-- EXECUTE FUNCTION log_audit_changes();
