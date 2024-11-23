import { logger } from "@repo/logger";
import { createClient } from "@repo/supabase/server";
import type { PostsOperationResult, UserOperationResult } from "../types/operation";

export async function getUser(): Promise<UserOperationResult> {
  const supabase = await createClient();

  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return { data: null, error };
    }

    if (!user) {
      return { 
        data: null, 
        error: new Error("User not found") 
      };
    }

    return { 
      data: {
        id: user.id,
        email: user.email ?? "",
        full_name: user.user_metadata?.full_name ?? null,
      }, 
      error: null 
    };
  } catch (error) {
    logger.error(error);
    return { data: null, error: error as Error };
  }
}

export async function getPosts(): Promise<PostsOperationResult> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .select()
      .order("created_at", { ascending: false });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    logger.error(error);
    return { data: null, error: error as Error };
  }
}
