"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/actions/safe-action";
import { registerUser } from "@repo/supabase/mutations";
import { registerSchema } from "./schema";
import { headers } from "next/headers";
import { z } from "zod";
import { zfd } from "zod-form-data";

export type RegistrationData = z.infer<typeof registerSchema>;

export type RegistrationState = {
  success: boolean;
  message?: string;
};

export const registerAction = actionClient
  .schema(zfd.formData(registerSchema))
  .action(async ({ parsedInput: { email, password, name } }) => {
    const { data, error } = await registerUser({ email, password, name });

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("Registration failed");
    }
    const headersList = headers();
    const pathname = (await headersList).get("x-pathname") || "";
    const locale = pathname.split("/")[1] || "en";

    redirect(`/${locale}/verify-email`);
  });
