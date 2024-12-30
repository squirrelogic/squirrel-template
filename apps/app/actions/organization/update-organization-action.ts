"use server";

import { authActionClient } from "@/actions/safe-action";
import { updateOrganizationSchema } from "./schema";
import { updateOrganization } from "@repo/supabase/mutations";

export const updateOrganizationAction = authActionClient
  .metadata({
    name: "update-organization",
  })
  .schema(updateOrganizationSchema)
  .action(async ({ parsedInput: { name, organizationId } }) => {
    const { data, error } = await updateOrganization(organizationId, { name });

    if (error) {
      throw error;
    }

    return { organization: data };
  });
