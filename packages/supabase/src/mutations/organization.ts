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

  try {
    const { data: organization, error } = await supabase
      .from("organizations")
      .insert({ name })
      .select()
      .single();

    if (error) {
      return { data: null, error };
    }

    // Link user as owner
    const { error: linkError } = await supabase
      .from("user_organizations")
      .insert({
        user_id: userId,
        organization_id: organization.id,
        role: "owner",
      });

    if (linkError) {
      return { data: null, error: linkError };
    }

    return { data: organization, error: null };
  } catch (error) {
    logger.error(error);
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
