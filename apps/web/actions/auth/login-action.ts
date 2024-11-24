"use server";

import { redirect } from "next/navigation";
import { actionClient } from "@/actions/safe-action";
import { loginUser } from "@repo/supabase/mutations";
import { loginSchema } from "./schema";
import { z } from "zod";
import { zfd } from "zod-form-data";

interface LoginState {
  success: boolean;
  message?: string;
}

export const loginAction = actionClient
  .schema(zfd.formData(loginSchema))
  .action(async ({ parsedInput: { email, password } }) => {
    const { data, error } = await loginUser({ email, password });

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("Login failed");
    }

    redirect("/dashboard");
    return { success: true };
  });
