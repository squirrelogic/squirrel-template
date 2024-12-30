import { getLogger } from "@repo/logger";
import { createClient } from "../clients/server";
import type {
  InvitationOperationResult,
  OrganizationOperationResult,
  OperationResult,
} from "../types/operation";

export async function createOrganization(
  name: string,
  userId: string,
): Promise<OrganizationOperationResult> {
  const logger = getLogger().child({
    module: "create-organization",
  });

  const supabase = await createClient();
  logger.info(userId, "User ID");
  logger.info(name, "Organization Name");
  try {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (!user) {
      console.error("User not authenticated");
      return { data: null, error: new Error("User not authenticated") };
    }
    const { data: organization, error } = await supabase
      .from("organizations")
      .insert({ name, owner_id: userId })
      .select()
      .single();

    if (error) {
      logger.error(error, "Error creating organization");
      return { data: null, error };
    }

    logger.info(organization, "Organization created");

    // Link user as owner
    const { error: linkError } = await supabase
      .from("user_organizations")
      .insert({
        user_id: userId,
        organization_id: organization.id,
        role: "owner",
      });

    if (linkError) {
      logger.error(linkError, "Error linking user to organization");
      return { data: null, error: linkError };
    }

    logger.info(linkError, "User linked to organization");

    return { data: organization, error: null };
  } catch (error) {
    logger.error(error, "Error creating organization");
    return { data: null, error: error as Error };
  }
}

export async function inviteUserToOrganization(
  organizationId: string,
  email: string,
): Promise<InvitationOperationResult> {
  const logger = getLogger().child({
    module: "invite-user-to-organization",
  });

  const supabase = await createClient();

  try {
    const { data: token, error: rpcError } = await supabase.rpc(
      "invite_user_to_organization",
      { org_id: organizationId, invite_email: email },
    );

    if (rpcError) return { data: null, error: rpcError };

    const { data: invitation, error } = await supabase
      .from("invitations")
      .select()
      .eq("token", token)
      .single();

    if (error) return { data: null, error };

    return { data: invitation, error: null };
  } catch (error) {
    logger.error(error);
    return { data: null, error: error as Error };
  }
}

export async function acceptInvitation(
  token: string,
  userId: string,
): Promise<OperationResult<{ success: boolean }>> {
  const logger = getLogger().child({
    module: "accept-invitation",
  });

  const supabase = await createClient();

  try {
    const { error } = await supabase.rpc("accept_invitation", {
      invite_token: token,
      user_id: userId,
    });

    if (error) {
      return { data: null, error };
    }

    return { data: { success: true }, error: null };
  } catch (error) {
    logger.error(error);
    return { data: null, error: error as Error };
  }
}

export async function updateOrganization(
  organizationId: string,
  data: { name: string },
): Promise<OrganizationOperationResult> {
  const logger = getLogger().child({
    module: "update-organization",
  });

  const supabase = await createClient();

  try {
    const { data: organization, error } = await supabase
      .from("organizations")
      .update({ name: data.name })
      .eq("id", organizationId)
      .select()
      .single();

    if (error) {
      return { data: null, error };
    }

    return { data: organization, error: null };
  } catch (error) {
    logger.error(error);
    return { data: null, error: error as Error };
  }
}
