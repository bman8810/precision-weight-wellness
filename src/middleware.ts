import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readSession, sessionCookieName } from "@/lib/clinic/auth";

function loginPath(prefix: "/staff" | "/app"): string {
  return `${prefix}/login`;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isStaffPath = pathname === "/staff" || pathname.startsWith("/staff/");
  const isAppPath = pathname === "/app" || pathname.startsWith("/app/");
  if (!isStaffPath && !isAppPath) return NextResponse.next();

  const token = request.cookies.get(sessionCookieName())?.value;
  const session = readSession(token);
  const isStaffLogin = pathname === "/staff/login";
  const isAppLogin = pathname === "/app/login";

  if (isStaffPath) {
    if (isStaffLogin) {
      if (session && (session.role === "staff" || session.role === "doctor")) {
        return NextResponse.redirect(new URL("/staff", request.url));
      }
      return NextResponse.next();
    }
    if (!session || (session.role !== "staff" && session.role !== "doctor")) {
      const url = new URL(loginPath("/staff"), request.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (isAppLogin) {
    if (session?.role === "patient") {
      return NextResponse.redirect(new URL("/app", request.url));
    }
    return NextResponse.next();
  }

  if (!session || session.role !== "patient") {
    const url = new URL(loginPath("/app"), request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/staff", "/staff/:path*", "/app", "/app/:path*"],
  runtime: "nodejs",
};
