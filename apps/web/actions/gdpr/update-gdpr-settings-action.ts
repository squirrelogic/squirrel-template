"use server";

import { actionClient } from "@/actions/safe-action";
import { gdprSettingsSchema } from "./gdpr-settings-schema";
import { updateGdprSettings } from "@repo/supabase/mutations/gdpr-settings";

export const updateGdprSettingsAction = actionClient
  .schema(gdprSettingsSchema)
  .action(async ({ parsedInput }) => {
    const { data, error } = await updateGdprSettings(parsedInput);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });