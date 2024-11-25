"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@repo/supabase/client";
import { logger } from "@repo/logger";

type UserProfile = User & {
  avatar_url: string | null;
  created_at: string | null;
  email: string;
  full_name: string | null;
  id: string;
  updated_at: string | null;
};

export function useUser(): { user: UserProfile | null; loading: boolean } {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      const { data: userData, error } = await supabase
        .from("users")
        .select()
        .eq("id", user?.id || "")
        .single();

      setUser({ ...user, profile: userData });
      setLoading(false);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        supabase
          .from("users")
          .select()
          .eq("id", session.user.id)
          .single()
          .then(({ data: userData, error }) => {
            setUser({ ...session.user, profile: userData });
            setLoading(false);
          });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return {
    user,
    loading,
  } as { user: UserProfile | null; loading: boolean };
}
