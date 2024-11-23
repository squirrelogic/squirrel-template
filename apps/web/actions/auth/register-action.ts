"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/actions/safe-action";
import { registerUser } from "@repo/supabase/mutations";
import { registerSchema } from "./schema";
import { z } from "zod";
import { zfd } from "zod-form-data";

export type RegistrationData = z.infer<typeof registerSchema>;

export type RegistrationState = {
  success: boolean;
  message?: string;
};

export const registerAction = actionClient
  .schema(zfd.formData(registerSchema))
  .stateAction<{
    prevState?: RegistrationState;
    newState: RegistrationState;
  }>(async ({ parsedInput: { email, password, name } }, { prevResult }) => {
    try {
      const { data, error } = await registerUser({ email, password, name });

      if (error) {
        return {
          prevState: prevResult?.data?.prevState,
          newState: {
            success: false,
            message: error.message,
          },
        };
      }

      if (!data) {
        return {
          prevState: prevResult?.data?.prevState,
          newState: {
            success: false,
            message: "Registration failed",
          },
        };
      }
    } catch (error) {
      return {
        prevState: prevResult?.data?.prevState,
        newState: {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        },
      };
    }

    redirect("/verify-email");
  });
