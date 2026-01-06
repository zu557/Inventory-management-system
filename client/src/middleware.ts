import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { Session } from "better-auth/types";
// const BACKEND_URL = "http://localhost:5000";

// type Role = "admin" | "staff" | "manager";
const ROLES = ["admin", "staff", "manager"] as const;
type Role = typeof ROLES[number];

const roleAccess: Record<string, Role[]> = {
  "/admin": ["admin"],
  "/staff": ["staff", "admin"],
  "/manager": ["manager", "admin"],
  "/inventory": ["staff ", "manager", "admin"],
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;


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
    // const cookie = req.headers.get("cookie") || "";

    // const res = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
    //   headers: {
    //     cookie,
    //   },
    //   credentials: "include",
    // });
    console.log("this is response object is from middleware ",session)
    // 🚫 Not logged in
    // if (!res.ok) {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // }
   
    const role = session?.user?.role?.toLowerCase();

    if (
      session &&
      pathname.startsWith("/login") &&
      role &&
      ROLES.includes(role as Role)
    ) {
      return NextResponse.redirect(
        new URL(`/${role}`, req.url)
      );
    }
       /* --------------------------------
       PROTECTED ROUTES
    --------------------------------- */
    const matchedRoute = Object.keys(roleAccess).find((route) =>
      pathname.startsWith(route)
    );

    if (!matchedRoute) {
      return NextResponse.next();
    }
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // const data = await session.user.json();
  
    // 🚫 No role
    if (!role) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // 🚫 Role not allowed
    if (!roleAccess[matchedRoute].includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // ✅ Authorized
    return NextResponse.next();
  } catch (err) {
    console.error("Middleware auth error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*", "/manager/:path*", "/login", "/inventory/:path*"],
};

// import { betterFetch } from "@better-fetch/fetch";
// import { Session } from "better-auth/types";
// import { NextResponse, type NextRequest } from "next/server";

// export default async function authMiddleware(request: NextRequest) {
//   const { data: session } = await betterFetch<Session>(
//     "http://localhost:5000/api/auth/get-session",
//     {
//       baseURL: request.nextUrl.origin,
//       method: "GET",
//       credentials: "include",
//       headers: {
//         cookie: request.headers.get("cookie") || "",
//       },
//     }
//   );
//   console.log("this session is from middleware ",session)
//   if (!session) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
// }

// export const config = {
//   matcher: ["/admin", "/manager","/staff"],
// };