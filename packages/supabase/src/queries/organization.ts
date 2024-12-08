import { getLogger } from "@repo/logger";
import { createClient } from "../clients/server";
import type {
  OrganizationOperationResult,
  OrganizationsOperationResult,
  InvitationOperationResult,
  OperationResult,
} from "../types/operation";

export async function getOrganization(
  organizationId: string,
): Promise<OrganizationOperationResult> {
  const logger = getLogger().child({
    module: "get-organization",
  });

  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("organizations")
      .select(
        `
        *,
        user_organizations (
          user_id,
          role
        )
      `,
      )
      .eq("id", organizationId)
      .single();

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    logger.error(error);
    return { data: null, error: error as Error };
  }
}

export async function getUserOrganizations(userId: string): Promise<
  OperationResult<
    Array<{
      role: string;
      organization: {
        id: string;
        name: string;
        created_at: string | null;
      };
    }>
  >
> {
  const logger = getLogger().child({
    module: "get-user-organizations",
  });

  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("user_organizations")
      .select(
        `
        role,
        organization:organizations (*)
      `,
      )
      .eq("user_id", userId);

    if (error) {
      return { data: null, error };
    }

    const filteredData = data?.filter(
      (
        org,
      ): org is {
        role: string;
        organization: NonNullable<typeof org.organization>;
      } => org.role !== null && org.organization !== null,
    );

    return { data: filteredData, error: null };
  } catch (error) {
    logger.error(error);
    return { data: null, error: error as Error };
  }
}

export async function getInvitation(
  token: string,
): Promise<InvitationOperationResult> {
  const logger = getLogger().child({
    module: "get-invitation",
  });

  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("invitations")
      .select(
        `
        *,
        organization:organizations (*)
      `,
      )
      .eq("token", token)
      .single();

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    logger.error(error);
    return { data: null, error: error as Error };
  }
}
