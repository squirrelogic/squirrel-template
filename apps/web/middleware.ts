import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@repo/supabase/middleware";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });
  const { response, user } = await updateSession(request, supabaseResponse);

  if (
    !request.nextUrl.pathname.endsWith("/login") &&
    !request.nextUrl.pathname.endsWith("/register") &&
    !request.nextUrl.pathname.endsWith("/verify-email") &&
    !user
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
