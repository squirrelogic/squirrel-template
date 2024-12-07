import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@repo/supabase/middleware";
import i18nMiddleware from "./i18n/middleware";
import { logger } from "@repo/logger";

const publicRoutes = ["/"];
const isPublicRoute = (pathname: string, locale: string) =>
  publicRoutes.some((route) => `/${locale}${route}` === pathname);

export async function middleware(request: NextRequest) {
  const defaultLocale = "en";

  // Use the Accept-Language header as a fallback
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferredLocale = acceptLanguage.split(",")[0]?.split("-")[0]; // e.g., 'en-US' -> 'en'

  const locale = preferredLocale || defaultLocale;
  const pathIsInLocale = request.nextUrl.pathname.startsWith(`/${locale}`);

  logger.debug({
    msg: "🔒 Start of middleware",
    path: request.nextUrl.pathname,
    method: request.method,
    locale: locale,
    pathIsInLocale: pathIsInLocale,
  });

  let initialResponse = NextResponse.next({
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

  const { response, user } = await updateSession(request, initialResponse);
  logger.debug({
    msg: "👤 Auth check completed",
    path: pathname,
    hasUser: !!user,
    userId: user?.id,
  });

  // Handle redirection from "/" to "/en/"
  //   if (pathname === "/") {
  //     logger.debug({
  //       msg: "🌐 Root redirect to /en/",
  //       from: pathname,
  //       to: "/en/",
  //     });
  //     return NextResponse.redirect(new URL("/en/login", request.url));
  //   }

  // Check if the route requires authentication
  const isPublic = true; // isPublicRoute(pathname, locale);

  logger.debug({
    msg: "🛡️ Route protection check",
    path: pathname,
    isPublic: isPublic,
    hasUser: !!user,
  });

  if (!isPublic && !user) {
    // Redirect to login if trying to access protected route without auth
    const redirectUrl = new URL(`/${locale}`, request.url);
    logger.warn({
      msg: "🚫 Unauthorized access attempt",
      from: pathname,
      to: redirectUrl.pathname,
    });
    return NextResponse.redirect(redirectUrl);
  }

  //   if (user && isPublic) {
  //     // Redirect to dashboard if trying to access login/register while authenticated
  //     const redirectUrl = new URL(`/${locale}/app/dashboard`, request.url);
  //     logger.debug({
  //       msg: "✅ Authenticated user redirected from public route",
  //       from: pathname,
  //       to: redirectUrl.pathname,
  //     });
  //     return NextResponse.redirect(redirectUrl);
  //   }

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
