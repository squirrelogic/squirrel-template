"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { actionClient } from "@/actions/safe-action";
import { loginUser } from "@repo/supabase/mutations";
import { loginSchema } from "./schema";
import { zfd } from "zod-form-data";

export const loginAction = actionClient
  .schema(zfd.formData(loginSchema))
  .action(async ({ parsedInput: { email, password } }) => {
    const { error } = await loginUser({ email, password });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    const headersList = headers();
    const pathname = (await headersList).get("x-pathname") || "";
    const locale = pathname.split("/")[1] || "en";

    redirect(`/${locale}/app/dashboard`);
  });
