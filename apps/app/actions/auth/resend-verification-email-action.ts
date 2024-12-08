"use server";
import { actionClientWithMeta } from "@/actions/safe-action";
import { z } from "zod";
import { resendVerificationEmail } from "@repo/supabase/mutations";

export const resendVerificationEmailSchema = z.object({
  email: z.string().email(),
});

export const resendVerificationEmailAction = actionClientWithMeta
  .metadata({
    name: "resend-verification-email",
  })
  .schema(resendVerificationEmailSchema)
  .action(async ({ parsedInput: { email } }) => {
    if (!email) {
      throw new Error("Not authenticated");
    }

    const { data, error } = await resendVerificationEmail(email);

    if (error) {
      throw error;
    }

    return { success: true };
  });
