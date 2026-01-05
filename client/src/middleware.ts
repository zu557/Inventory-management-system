import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { Session } from "better-auth/types";

const ROLES = ["admin", "staff", "manager"] as const;
type Role = typeof ROLES[number];

// Public routes (no auth required)
const PUBLIC_ROUTES = ["/login", "/"]; // Add more if you have other public pages

// Role-based default redirects after login
const ROLE_DEFAULT_PATH: Record<Role, string> = {
  admin: "/admin",
  manager: "/manager",
  staff: "/staff",
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes without checking session
  if (PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    try {
      const { data: session } = await betterFetch<Session>(
        "http://localhost:5000/api/auth/get-session",
        {
          baseURL: req.nextUrl.origin,
          method: "GET",
          credentials: "include",
          headers: {
            cookie: req.headers.get("cookie") || "",
          },
        }
      );

      const role = session?.user?.role?.toLowerCase() as Role | undefined;

      // If already logged in and trying to access auth pages → redirect to their dashboard
      if (session && role && ROLES.includes(role) && pathname.startsWith("/login") ) {
        return NextResponse.redirect(new URL(ROLE_DEFAULT_PATH[role], req.url));
      }

      return NextResponse.next();
    } catch (err) {
      // Session fetch failed → treat as not logged in, allow public page
      return NextResponse.next();
    }
  }

  // All other routes are protected (dashboard)
  try {
    const { data: session } = await betterFetch<Session>(
      "http://localhost:5000/api/auth/get-session",
      {
        baseURL: req.nextUrl.origin,
        method: "GET",
        credentials: "include",
        headers: {
          cookie: req.headers.get("cookie") || "",
        },
      }
    );

    if (!session) {
      // Not logged in → redirect to login (preserve attempted URL if you want)
      const loginUrl = new URL("/login", req.url);
      // Optional: loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const role = session.user.role?.toLowerCase() as Role | undefined;

    if (!role || !ROLES.includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url)); // Or /login
    }

    // Optionally: further role checks here if needed, but layout.tsx handles finer permissions
    return NextResponse.next();
  } catch (err) {
    console.error("Middleware auth error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|public/|.png|.jpg|.svg).*)",
  ],
};