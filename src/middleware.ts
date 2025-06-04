import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const INVITE_QUERY_PARAM = "invite";
const INVITE_COOKIE_NAME = "invite";
const { SECRET_INVITE_KEY } = process.env;

function trackInvite(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const invite = searchParams.get(INVITE_QUERY_PARAM);

  if (invite) {
    const response = NextResponse.next();
    response.cookies.set(INVITE_COOKIE_NAME, invite);
    return response;
  }
}

// This check only runs on production
function preventUninvitedAuth(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    true //process.env.NODE_ENV === "production"
    && pathname.startsWith("/auth")
    && request.cookies.get(INVITE_COOKIE_NAME)?.value !== SECRET_INVITE_KEY!
  ) {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }
}

export function middleware(request: NextRequest) {
  let response = trackInvite(request);
  if (response) return response;

  response = preventUninvitedAuth(request);
  if (response) return response;

  return NextResponse.next();
}
