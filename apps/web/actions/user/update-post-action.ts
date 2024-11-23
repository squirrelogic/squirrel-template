"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authActionClient } from "@/actions/safe-action";
import { updateUser } from "@repo/supabase/mutations";
import { updateUserSchema } from "./schema";
import { z } from "zod";
import { zfd } from "zod-form-data";

export type UpdateData = z.infer<typeof updateUserSchema>;

type UpdateState = {
  success: boolean;
  message?: string;
};

export const updateUserAction = authActionClient
  .schema(zfd.formData(updateUserSchema))
  .metadata({
    name: "update-user",
  })
  .stateAction<UpdateState>(
    async ({ parsedInput: input, ctx: { user } }, { prevResult }) => {
      try {
        const { data, error } = await updateUser(user.id, input);

        if (error) {
          return {
            success: false,
            message: error.message,
          };
        }

        if (!data) {
          return {
            success: false,
            message: "Update failed",
          };
        }

        revalidatePath("/dashboard", "layout");
        redirect("/dashboard");
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : "Update failed",
        };
      }
    },
  );
