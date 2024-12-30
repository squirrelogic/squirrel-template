"use server";

import { authActionClient } from "@/actions/safe-action";
import { z } from "zod";
import { getLogger } from "@repo/logger";
import { getOrganization, getUserOrganizations } from "@repo/supabase/queries";
import { getOrganizationSchema } from "./schema";

export const getOrganizationAction = authActionClient
  .metadata({
    name: "get-organization",
  })
  .schema(getOrganizationSchema)
  .action(async ({ parsedInput: { organizationId } }) => {
    const logger = getLogger();
    const { data, error } = await getOrganization(organizationId);

    if (error) {
      throw error;
    }

    return { organization: data };
  });
