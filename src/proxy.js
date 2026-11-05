import { NextResponse } from "next/server";
import { ADMIN_DEMO_COOKIE, ADMIN_SESSION_COOKIE } from "@/lib/adminSession";

// Only signed-in admins can open the admin pages; everyone else goes to the
// admin log-in. When the backend is ready, this checks its session instead.
//
// Sample data: "?preview=demo" on any admin page turns sample data on for the
// whole admin side (so clicking around keeps it), "?preview=off" turns it off.
export function proxy(request) {
  const { pathname, searchParams } = request.nextUrl;
  const preview = searchParams.get("preview");

  const open = ["/admin/login", "/admin/forgot-password"];
  const isOpen = open.some((path) => pathname.startsWith(path));
  const signedIn = request.cookies.has(ADMIN_SESSION_COOKIE);

  if (!isOpen && !signedIn && preview !== "demo") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const response = NextResponse.next();
  if (preview === "demo") {
    response.cookies.set(ADMIN_DEMO_COOKIE, "1", { path: "/" });
    response.cookies.set(ADMIN_SESSION_COOKIE, "demo", { path: "/" });
  }
  if (preview === "off") {
    response.cookies.set(ADMIN_DEMO_COOKIE, "", { path: "/", maxAge: 0 });
  }
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
