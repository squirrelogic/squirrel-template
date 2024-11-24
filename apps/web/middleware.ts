import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@repo/supabase/middleware";
import i18nMiddleware from "./i18n/middleware";
import { logger } from "@repo/logger";

const publicRoutes = ["/login", "/register", "/verify-email"];

export async function middleware(request: NextRequest) {
  logger.debug({
    msg: "🔒 Start of middleware",
    path: request.nextUrl.pathname,
    method: request.method,
  });

  let supabaseResponse = NextResponse.next({
    request,
  });

  const { pathname } = request.nextUrl;

  // Skip middleware for specific paths
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/monitoring") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    /\.(svg|png|ico|jpg)$/.test(pathname) || // Skip public assets by extension
    pathname === "/sentry-example-page"
  ) {
    logger.debug({
      msg: "🔄 Path skipping",
      path: pathname,
      reason: "excluded path",
    });
    return NextResponse.next();
  }

  const { response, user } = await updateSession(request, supabaseResponse);
  logger.debug({
    msg: "👤 Auth check completed",
    path: pathname,
    hasUser: !!user,
    userId: user?.id,
  });

  // Handle redirection from "/" to "/en/"
  if (pathname === "/") {
    logger.debug({
      msg: "🌐 Root redirect to /en/",
      from: pathname,
      to: "/en/",
    });
    return NextResponse.redirect(new URL("/en/", request.url));
  }

  // Check if the route requires authentication
  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathname.includes(route) || pathname === "/" || pathname === "/en",
  );

  logger.debug({
    msg: "🛡️ Route protection check",
    path: pathname,
    isPublicRoute,
    hasUser: !!user,
  });

  if (!isPublicRoute && !user) {
    // Redirect to login if trying to access protected route without auth
    const redirectUrl = new URL("/login", request.url);
    logger.warn({
      msg: "🚫 Unauthorized access attempt",
      from: pathname,
      to: redirectUrl.pathname,
    });
    return NextResponse.redirect(redirectUrl);
  }

  if (user && publicRoutes.some((route) => pathname.includes(route))) {
    // Redirect to dashboard if trying to access login/register while authenticated
    const redirectUrl = new URL("/app/dashboard", request.url);
    logger.debug({
      msg: "✅ Authenticated user redirected from public route",
      from: pathname,
      to: redirectUrl.pathname,
    });
    return NextResponse.redirect(redirectUrl);
  }

  // Apply i18nMiddleware for locale detection and redirection
  const i18nResponse = i18nMiddleware(request);
  if (i18nResponse) {
    logger.debug({
      msg: "🌐 i18n redirect",
      from: pathname,
      to: i18nResponse.headers.get("Location"),
    });
    return i18nResponse;
  }

  logger.debug({
    msg: "✨ Middleware completed",
    path: pathname,
  });
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except Next.js internals
     */
    "/((?!_next/static|_next/image).*)",
  ],
};
