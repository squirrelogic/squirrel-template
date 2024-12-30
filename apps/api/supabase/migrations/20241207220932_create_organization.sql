    CREATE TABLE organizations (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE user_organizations (
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
        default_organization BOOLEAN DEFAULT FALSE,
        role TEXT CHECK (role IN ('owner', 'admin', 'member')) DEFAULT 'member',
        PRIMARY KEY (user_id, organization_id)
    );

    CREATE TABLE invitations (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
        email TEXT NOT NULL,
        status TEXT CHECK (status IN ('pending', 'accepted', 'expired')) DEFAULT 'pending',
        token UUID DEFAULT uuid_generate_v4(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '7 days')
    );

    CREATE OR REPLACE FUNCTION create_default_organization_for_user()
    RETURNS TRIGGER AS $$
    DECLARE
        new_org_id UUID;
    BEGIN
        -- Create a new organization for the user
        INSERT INTO public.organizations (name) VALUES (NEW.full_name || '''s Organization')
        RETURNING id INTO new_org_id;

        -- Link the user to the new organization as the owner
        INSERT INTO public.user_organizations (user_id, organization_id, role)
        VALUES (NEW.id, new_org_id, 'owner');

        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER after_user_insert_create_org
    AFTER INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION create_default_organization_for_user();

    CREATE OR REPLACE FUNCTION invite_user_to_organization(org_id UUID, invite_email TEXT)
    RETURNS UUID AS $$
    DECLARE
        invite_id UUID;
    BEGIN
        -- Create an invitation
        INSERT INTO public.invitations (organization_id, email)
        VALUES (org_id, invite_email)
        RETURNING id INTO invite_id;

        RETURN invite_id;
    END;
    $$ LANGUAGE plpgsql;

    CREATE OR REPLACE FUNCTION accept_invitation(invite_token UUID, user_id UUID)
    RETURNS VOID AS $$
    DECLARE
        invite_record RECORD;
    BEGIN
        -- Retrieve the invitation
        SELECT * INTO invite_record FROM public.invitations WHERE token = invite_token AND status = 'pending';

        IF invite_record IS NULL THEN
            RAISE EXCEPTION 'Invalid or expired invitation';
        END IF;

        -- Link the user to the organization
        INSERT INTO public.user_organizations (user_id, organization_id, role)
        VALUES (user_id, invite_record.organization_id, 'member');

        -- Update the invitation status
        UPDATE invitations SET status = 'accepted' WHERE id = invite_record.id;
    END;
    $$ LANGUAGE plpgsql;

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY user_can_insert_organization
-- create policy "Enable insert for authenticated users only"
-- on "public"."organizations"
-- as PERMISSIVE
-- for INSERT
-- to authenticated
-- with check (
--   true
-- );
CREATE POLICY user_can_insert_organization
    ON organizations
    FOR INSERT
    WITH CHECK (
        auth.uid() IS NOT NULL -- Ensure the authenticated user can insert
    );
-- Policy to allow users to read organizations they are members of
CREATE POLICY user_can_read_organization
    ON organizations
    FOR SELECT
    USING (
        -- Allow if the user is the owner of the organization
        organizations.owner_id = auth.uid()
        OR
        -- Allow if the user is a member of the organization
        EXISTS (
            SELECT 1
            FROM public.user_organizations
            WHERE user_organizations.organization_id = organizations.id
            AND user_organizations.user_id = auth.uid()
        )
    );
-- Policy to allow owners to update organizations
CREATE POLICY owner_can_update_organization
    ON organizations
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1
            FROM public.user_organizations
            WHERE user_organizations.organization_id = organizations.id
            AND user_organizations.user_id = auth.uid()
            AND user_organizations.role = 'owner'
        )
    );

-- Policy to allow owners to delete organizations
CREATE POLICY owner_can_delete_organization
    ON organizations
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1
            FROM public.user_organizations
            WHERE user_organizations.organization_id = organizations.id
            AND user_organizations.user_id = auth.uid()
            AND user_organizations.role = 'owner'
        )
    );

ALTER TABLE user_organizations ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read their own organization memberships
CREATE POLICY user_can_read_memberships
    ON user_organizations
    FOR SELECT
    USING (user_id = auth.uid());

-- Policy to allow owners to add new members
CREATE POLICY owner_can_add_members
    ON user_organizations
    FOR INSERT
    WITH CHECK (
        EXISTS (SELECT 1 from public.organizations where owner_id = auth.uid())
        OR
        EXISTS (
            SELECT 1
            FROM public.user_organizations AS uo
            WHERE uo.organization_id = user_organizations.organization_id
            AND uo.user_id = auth.uid()
            AND uo.role = 'owner'
        )
    );

-- Policy to allow owners to remove members
CREATE POLICY owner_can_remove_members
    ON user_organizations
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1
            FROM public.user_organizations AS uo
            WHERE uo.organization_id = user_organizations.organization_id
            AND uo.user_id = auth.uid()
            AND uo.role = 'owner'
        )
    );

ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read invitations sent to their email
CREATE POLICY user_can_read_invitations
    ON invitations
    FOR SELECT
    USING (email = auth.email());

-- Policy to allow owners to create invitations
CREATE POLICY owner_can_create_invitations
    ON invitations
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM public.user_organizations
            WHERE user_organizations.organization_id = invitations.organization_id
            AND user_organizations.user_id = auth.uid()
            AND user_organizations.role = 'owner'
        )
    );

-- Policy to allow owners to delete (revoke) invitations
CREATE POLICY owner_can_delete_invitations
    ON invitations
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1
            FROM public.user_organizations
            WHERE user_organizations.organization_id = invitations.organization_id
            AND user_organizations.user_id = auth.uid()
            AND user_organizations.role = 'owner'
        )
    );
