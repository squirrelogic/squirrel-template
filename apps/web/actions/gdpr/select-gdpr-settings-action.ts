"use server";

import { actionClient } from "@/actions/safe-action";
import { gdprSettingsSchema } from "./gdpr-settings-schema";
import { getGdprSettings } from "@repo/supabase/mutations/gdpr-settings";

export const selectGdprSettingsAction = actionClient
  .schema(gdprSettingsSchema.pick({ user_id: true }))
  .action(async ({ parsedInput: { user_id } }) => {
    const { data, error } = await getGdprSettings(user_id);

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("No GDPR settings found");
    }

    return data;
  });
