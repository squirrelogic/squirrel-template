"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/actions/safe-action";
import { registerUser } from "@v1/supabase/mutations";
import { registerSchema } from "./schema";
import { z } from "zod";
import { zfd } from "zod-form-data";

export type RegistrationData = z.infer<typeof registerSchema>;

type RegistrationState = {
    success: boolean;
    message?: string;
  };

export const registerAction = actionClient
  .schema(zfd.formData(registerSchema))
  .stateAction<RegistrationState>(async ({ parsedInput: input }, { prevResult }) => {
      const { data, error } = await registerUser(input);

      if (error) {
        return {
          success: false,
          message: JSON.stringify(error),
        };
      }

      revalidatePath("/dashboard", "layout");
      redirect("/verify-email");
  });
