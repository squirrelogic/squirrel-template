"use server";

import { actionClientWithMeta } from "@/actions/safe-action";
import { acceptInviteSchema } from "./schema";
import { acceptInvitation } from "@repo/supabase/mutations";
import { getInvitation } from "@repo/supabase/queries";

export const acceptInviteAction = actionClientWithMeta
  .metadata({
    name: "accept-invite",
  })
  .schema(acceptInviteSchema)
  .action(async ({ parsedInput: { token, userId } }) => {
    if (!userId) {
      const { data: invitation } = await getInvitation(token);
      return {
        success: false,
        needsSignup: true,
        token,
        organization: invitation?.organization_id,
      };
    }

    const { error } = await acceptInvitation(token, userId);

    if (error) {
      throw error;
    }

    return { success: true };
  });
