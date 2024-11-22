// import { logger } from "@repo/logger";
import { createClient } from "@repo/supabase/server";
import type { Database, Tables, TablesUpdate } from "../types";

export type RegisterUserInput = {
  email: string;
  password: string;
  name: string;
};

export async function registerUser({
  email,
  password,
  name,
}: RegisterUserInput) {
  const supabase = await createClient();
  console.log(email, password, name);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  return { data, error: null };
}

export async function updateUser(userId: string, data: TablesUpdate<"users">) {
  const supabase = await createClient();

  try {
    const result = await supabase.from("users").update(data).eq("id", userId);

    return result;
  } catch (error) {
    // logger.error(error);

    throw error;
  }
}
