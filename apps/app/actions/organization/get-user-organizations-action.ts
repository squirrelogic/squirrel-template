"use server";

import { authActionClient } from "@/actions/safe-action";
import { z } from "zod";
import { getLogger } from "@repo/logger";
import { getUserOrganizations } from "@repo/supabase/queries";
const getUserOrganizationsSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

export const getUserOrganizationsAction = authActionClient
  .metadata({
    name: "get-user-organizations",
  })
  .schema(getUserOrganizationsSchema)
  .action(async ({ parsedInput: { userId } }) => {
    console.log("userId", userId);
    const logger = getLogger();
    const { data, error } = await getUserOrganizations(userId);

    if (error) {
      throw error;
    }

    return { organizations: data };
  });
