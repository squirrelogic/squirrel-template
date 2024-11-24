"use server";

import { z } from "zod";
import { actionClient } from "@/actions/safe-action";
import { resendConfirmation } from "@repo/supabase/mutations";
import { zfd } from "zod-form-data";

const schema = z.object({
  email: z.string().email(),
});

export const resendConfirmationAction = actionClient
  .schema(zfd.formData(schema))
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
