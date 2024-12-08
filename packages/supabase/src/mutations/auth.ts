import { createClient } from "../clients/server";
import type { OperationResult } from "../types/operation";

export async function resendVerificationEmail(
  email: string,
): Promise<OperationResult<{ success: boolean }>> {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      return { data: null, error };
    }

    return { data: { success: true }, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}
