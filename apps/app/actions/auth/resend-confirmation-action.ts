"use server";

import { actionClientWithMeta } from "@/actions/safe-action";
import { resendConfirmation } from "@repo/supabase/mutations";
import { resendConfirmationSchema } from "./schema";

export const resendConfirmationAction = actionClientWithMeta
  .metadata({
    name: "resend-confirmation",
  })
  .schema(resendConfirmationSchema)
  .action(async ({ parsedInput: { email } }) => {
    const { data, error } = await resendConfirmation({ email });

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("Failed to resend confirmation email");
    }

    return { success: true };
  });
