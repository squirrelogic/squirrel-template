import { getLogger } from "@repo/logger";
import { createClient } from "@repo/supabase/server";
import type { Tables, TablesUpdate } from "../types";
import type {
  RegisterResult,
  UserOperationResult,
  OperationResult,
} from "../types/operation";
export * from "./organization";
export * from "./auth";

export type RegisterUserInput = {
  email: string;
  password: string;
  name: string;
};

export async function registerUser({
  email,
  password,
  name,
}: RegisterUserInput): Promise<RegisterResult> {
  const logger = getLogger().child({
    module: "register-user",
  });

  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      return { data: null, error };
    }

    if (!data.user) {
      return {
        data: null,
        error: new Error("Failed to create user"),
      };
    }

    return {
      data: {
        id: data.user.id,
        email: data.user.email ?? "",
      },
      error: null,
    };
  } catch (error) {
    logger.error(error);
    return { data: null, error: error as Error };
  }
}

export type LoginUserInput = {
  email: string;
  password: string;
};

export async function loginUser({
  email,
  password,
}: LoginUserInput): Promise<RegisterResult> {
  const logger = getLogger().child({
    module: "login-user",
  });

  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { data: null, error };
    }

    if (!data.user) {
      return {
        data: null,
        error: new Error("Failed to login"),
      };
    }

    return {
      data: {
        id: data.user.id,
        email: data.user.email ?? "",
      },
      error: null,
    };
  } catch (error) {
    logger.error(error);
    return { data: null, error: error as Error };
  }
}

export async function updateUser(
  userId: string,
  data: TablesUpdate<"users">,
): Promise<UserOperationResult> {
  const logger = getLogger().child({
    module: "update-user",
  });

  const supabase = await createClient();

  try {
    const { data: userData, error } = await supabase
      .from("users")
      .update(data)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      return { data: null, error };
    }

    return {
      data: {
        id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
      },
      error: null,
    };
  } catch (error) {
    logger.error(error);
    return { data: null, error: error as Error };
  }
}

export type ResendConfirmationInput = {
  email: string;
};

export async function resendConfirmation({
  email,
}: ResendConfirmationInput): Promise<OperationResult<{ success: boolean }>> {
  const logger = getLogger().child({
    module: "resend-confirmation",
  });

  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      return { data: null, error };
    }

    return { data: { success: true }, error: null };
  } catch (error) {
    logger.error(error);
    return { data: null, error: error as Error };
  }
}
