"use server";

import { revalidatePath } from "next/cache";
import { authActionClient } from "@/actions/safe-action";
import { updateUser } from "@repo/supabase/mutations";
import { headers } from "next/headers";
import { updateUserSchema } from "./schema";

export const updateUserAction = authActionClient
  .schema(updateUserSchema)
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

    const headersList = headers();
    const pathname = (await headersList).get("x-pathname") || "";
    const locale = pathname.split("/")[1] || "en";

    revalidatePath(`/${locale}/app/account/profile`, "page");
  });
