"use client";

import { useEffect, useState } from "react";
import { User } from "@repo/supabase/types";
import { createClient } from "@repo/supabase/client";

type UserProfile = User & {
  avatar_url: string | null;
  created_at: string | null;
  email: string;
  full_name: string | null;
  id: string;
  updated_at: string | null;
};

export function useUser(): {
  user: UserProfile | null;
  refresh: () => void;
  loading: boolean;
} {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const getUser = async () => {
    setLoading(true);
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      const { data: userData } = await supabase
        .from("users")
        .select()
        .eq("id", user?.id || "")
        .single();

      setUser(userData as UserProfile);
      setLoading(false);
    });
  };

  useEffect(() => {
    // Get initial user
    getUser();

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
          .then(({ data: userData }) => {
            setUser(userData as UserProfile);
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
    refresh: getUser,
    loading,
  } as { user: UserProfile | null; refresh: () => void; loading: boolean };
}
