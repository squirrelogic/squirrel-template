import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@repo/supabase/middleware";
import i18nMiddleware from "./i18n/middleware";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  console.log("in middleware");
  // Apply i18nMiddleware for locale detection and redirection
  const i18nResponse = i18nMiddleware(request);
  if (i18nResponse) {
    console.log("handling i18n");
    return i18nResponse; // Redirect or modify request as needed
  }

  const { response, user } = await updateSession(request, supabaseResponse);

  const { pathname } = request.nextUrl;

  // Handle redirection from "/" to "/en/"
  if (pathname === "/") {
    console.log("redirecting to /en/");
    return NextResponse.redirect(new URL("/en/", request.url));
  }

  // Redirect unauthenticated users to localized login pages
  const unauthenticatedPaths = ["/login", "/register", "/verify-email"];
  const isUnauthenticatedPath = unauthenticatedPaths.some((path) =>
    pathname.endsWith(path),
  );

  if (!isUnauthenticatedPath && !user) {
    console.log("redirecting to /en/login");
    const locale = request.nextUrl.pathname.split("/")[1] || "en"; // Detect locale from URL or fallback to "en"
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
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
