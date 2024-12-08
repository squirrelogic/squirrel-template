"use server";

import { authActionClient } from "@/actions/safe-action";
import { createOrganizationSchema } from "./schema";
import { createOrganization } from "@repo/supabase/mutations";

export const createOrganizationAction = authActionClient
  .metadata({
    name: "create-organization",
  })
  .schema(createOrganizationSchema)
  .action(async ({ parsedInput: { name, userId } }) => {
    const { data, error } = await createOrganization(name, userId);

    if (error) {
      throw error;
    }

    return { organization: data };
  });
