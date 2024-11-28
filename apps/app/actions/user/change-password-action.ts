"use server";

import { authActionClient } from "@/actions/safe-action";
import { changePassword } from "@repo/supabase/mutations/change-password";
import { changePasswordSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const changePasswordAction = authActionClient
  .metadata({
    name: "change-password",
  })
  .schema(changePasswordSchema)
  .action(async ({ parsedInput: { newPassword } }) => {
    const headerList = await headers();
    const pathname = (await headerList).get("x-invoke-path") || "/";
    try {
      await changePassword(newPassword);
      revalidatePath(pathname, "layout");
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to update password");
    }
  });
