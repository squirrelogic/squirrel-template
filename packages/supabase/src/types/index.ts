import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Database } from "./db";

export type Client = SupabaseClient<Database>;
export type { User };
export * from "./db";
