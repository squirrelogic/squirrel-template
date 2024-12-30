-- Enable the uuid extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Subscription Plans Table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL, -- e.g., 'Basic', 'Pro'
    billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'yearly')),
    price NUMERIC NOT NULL,
    discount_price NUMERIC, -- For discounted yearly subscriptions
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions Table
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    polar_subscription_id TEXT, -- ID from Polar.sh
    status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'expired', 'past_due')),
    start_date TIMESTAMP DEFAULT NOW(),
    end_date TIMESTAMP,
    grace_period_end TIMESTAMP, -- For handling grace periods
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row-Level Security for Subscriptions Table
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow users to manage their own subscriptions
CREATE POLICY "Users can manage their own subscriptions"
ON subscriptions
FOR ALL
USING (user_id = auth.uid());

-- Transactions Table (for subscription payments and one-off purchases)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(id),
    amount NUMERIC NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('subscription', 'one_off')),
    polar_transaction_id TEXT, -- ID from Polar.sh
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row-Level Security for Transactions Table
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow users to view their own transactions
CREATE POLICY "Users can view their own transactions"
ON transactions
FOR SELECT
USING (user_id = auth.uid());

-- RLS Policy: Allow users to insert their own transactions
CREATE POLICY "Users can insert their own transactions"
ON transactions
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Products Table (for one-off purchases)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row-Level Security for Products Table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow all users to view products
CREATE POLICY "Allow all users to view products"
ON products
FOR SELECT
USING (true);

-- Order Items Table (links transactions to products or subscriptions)
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id), -- For one-off purchases
    subscription_id UUID REFERENCES subscriptions(id), -- For subscriptions
    quantity INTEGER DEFAULT 1
);

-- Enable Row-Level Security for Order Items Table
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow users to view their own order items
CREATE POLICY "Users can view their own order items"
ON order_items
FOR SELECT
USING (
    transaction_id IN (
        SELECT id FROM transactions WHERE user_id = auth.uid()
    )
);

-- Function to mark subscription as past_due and set a grace period
CREATE OR REPLACE FUNCTION set_subscription_past_due(subscription_uuid UUID, grace_period_days INTEGER DEFAULT 7)
RETURNS VOID AS $$
BEGIN
    UPDATE subscriptions
    SET
        status = 'past_due',
        grace_period_end = end_date + (grace_period_days || ' days')::INTERVAL
    WHERE id = subscription_uuid
      AND status = 'active';

    RAISE NOTICE 'Subscription % marked as past_due with grace period until %',
        subscription_uuid, (SELECT grace_period_end FROM subscriptions WHERE id = subscription_uuid);
END;
$$ LANGUAGE plpgsql;

-- Function to expire past_due subscriptions after grace period ends
CREATE OR REPLACE FUNCTION expire_past_due_subscriptions()
RETURNS VOID AS $$
BEGIN
    UPDATE subscriptions
    SET status = 'expired'
    WHERE status = 'past_due'
      AND grace_period_end < NOW();

    RAISE NOTICE 'Expired past_due subscriptions where grace period has ended.';
END;
$$ LANGUAGE plpgsql;

-- Function to mark subscription as paid, reset status, and extend end_date
CREATE OR REPLACE FUNCTION mark_subscription_as_paid(subscription_uuid UUID, billing_cycle TEXT)
RETURNS VOID AS $$
BEGIN
    -- Check the billing cycle validity
    IF billing_cycle NOT IN ('monthly', 'yearly') THEN
        RAISE EXCEPTION 'Invalid billing cycle. Must be "monthly" or "yearly".';
    END IF;

    -- Update the subscription to active, clear grace_period_end, and extend end_date
    UPDATE subscriptions
    SET
        status = 'active',
        grace_period_end = NULL,
        end_date =
            CASE
                WHEN billing_cycle = 'monthly' THEN end_date + INTERVAL '1 month'
                WHEN billing_cycle = 'yearly' THEN end_date + INTERVAL '1 year'
            END
    WHERE id = subscription_uuid;

    RAISE NOTICE 'Subscription % marked as paid and extended to %',
        subscription_uuid, (SELECT end_date FROM subscriptions WHERE id = subscription_uuid);
END;
$$ LANGUAGE plpgsql;

-- Job to run the expire_past_due_subscriptions function every day
CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule(
    'expire_past_due_subscriptions_job',  -- Job name
    '0 0 * * *',                          -- Runs daily at midnight (UTC)
    $$ SELECT expire_past_due_subscriptions(); $$
);

-- 
-- SELECT cron.schedule(
--     'expire_past_due_subscriptions_job',
--     '0 2 * * *',  -- Change to run daily at 2 AM (UTC)
--     $$ SELECT expire_past_due_subscriptions(); $$
-- );