"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authActionClient } from "@/actions/safe-action";
import { updateUser } from "@repo/supabase/mutations";
import { updateUserSchema } from "./schema";
import { z } from "zod";
import { zfd } from "zod-form-data";

export type UpdateData = z.infer<typeof updateUserSchema>;

export const updateUserAction = authActionClient
  .schema(zfd.formData(updateUserSchema))
  .metadata({
    name: "update-user",
  })
  .action(async ({ parsedInput: input, ctx: { user } }) => {
    const { data, error } = await updateUser(user.id, input);

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("Update failed");
    }

    revalidatePath("/dashboard", "layout");
    redirect("/dashboard");
    return { success: true };
  });
