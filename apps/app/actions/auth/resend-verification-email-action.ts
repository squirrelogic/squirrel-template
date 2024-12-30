"use server";
import { actionClientWithMeta } from "@/actions/safe-action";
import { resendVerificationEmail } from "@repo/supabase/mutations";
import { resendVerificationEmailSchema } from "./schema";

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
