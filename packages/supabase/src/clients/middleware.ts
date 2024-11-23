import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";
import type { UserOperationResult } from "../types/operation";

export type SessionResult = {
  response: NextResponse;
  user: UserOperationResult["data"];
};

export const updateSession = async (
  request: NextRequest,
  response: NextResponse,
): Promise<SessionResult> => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }

          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return { 
        response, 
        user: null 
      };
    }

    if (!user) {
      return { 
        response, 
        user: null 
      };
    }

    return { 
      response, 
      user: {
        id: user.id,
        email: user.email ?? "",
        full_name: user.user_metadata?.full_name ?? null,
      }
    };
  } catch (error) {
    return { 
      response, 
      user: null 
    };
  }
};
