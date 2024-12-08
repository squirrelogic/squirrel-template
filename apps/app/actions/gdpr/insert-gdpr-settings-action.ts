"use server";

import { actionClientWithMeta } from "@/actions/safe-action";
import { gdprSettingsSchema } from "./gdpr-settings-schema";
import { insertGdprSettings } from "@repo/supabase/mutations/gdpr-settings";

export const insertGdprSettingsAction = actionClientWithMeta
  .metadata({
    name: "insert-gdpr-settings",
  })
  .schema(gdprSettingsSchema)
  .action(async ({ parsedInput }) => {
    const { data, error } = await insertGdprSettings(parsedInput);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
