"use server";

import { authActionClient } from "@/actions/safe-action";
import { inviteUserSchema } from "./schema";
import { inviteUserToOrganization } from "@repo/supabase/mutations";
// import { sendInviteEmail } from "@repo/email/actions";

export const inviteUserAction = authActionClient
  .metadata({
    name: "invite-user",
  })
  .schema(inviteUserSchema)
  .action(async ({ parsedInput: { email, organizationId } }) => {
    const { data: invitation, error } = await inviteUserToOrganization(
      organizationId,
      email,
    );

    if (error) {
      throw error;
    }

    // await sendInviteEmail({
    // email,
    // inviteToken: invitation?.token,
    // organizationId,
    // });

    return { success: true };
  });
