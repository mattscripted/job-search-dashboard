import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const INVITE_COOKIE_NAME = "inviteKey";
const { SECRET_INVITE_KEY } = process.env;

export function middleware(request: NextRequest) {
  console.log("MS: Next.js middleware", request);
  // Exclude permission check on development environment
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const { pathname, searchParams } = request.nextUrl;

  /**
   * Check if you have permission to view the site:
   * - ?inviteKey=<SECRET_INVITE_KEY> in the URL
   * - inviteKey cookie has <SECRET_INVITE_KEY> as its value
   */

  /**
   * Check query params:
   * - If it exists with the right invite key, store the value in a cookie
   * - Then, move onto the requested page
   */
  if (searchParams.get(INVITE_COOKIE_NAME) === SECRET_INVITE_KEY) {
    const response = NextResponse.next();
    response.cookies.set(INVITE_COOKIE_NAME, SECRET_INVITE_KEY);
    return response;
  }

  /**
   * Check invite cookie:
   * - If it exists with the right value, then move onto the request page
   */
  if (request.cookies.get(INVITE_COOKIE_NAME)?.value === SECRET_INVITE_KEY) {
    return NextResponse.next();
  }

  /**
   * Forbidden:
   * - Redirect to the /forbidden route
   * - Ignore redirecting infinitely if you are already on the /forbidden route
   */
  if (!pathname.startsWith("/forbidden")) {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  } else {
    return NextResponse.next();
  }
}

/**
 * Only apply middleware to routes.
 * Copied from: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export const config = {
  matcher: ['/behavioural-interviews', '/404'],
}
