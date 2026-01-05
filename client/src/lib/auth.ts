
// import { cookies } from "next/headers";
// import { betterFetch } from "@better-fetch/fetch";
// import { Session } from "better-auth/types";

// export async function getServerSession() {
//   const cookieStore = cookies();

//   const { data } = await betterFetch<Session>(
//     "/api/auth/get-session",
//     {
//       baseURL: process.env.NEXT_PUBLIC_APP_URL,
//       headers: {
//         cookie: cookieStore.toString(),
//       },
//       credentials: "include",
//     }
//   );

//   return data;
// }

// //src/auth/config.ts
// import type { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";

// // Mock database (replace with your real DB)
// const users = [
//   {
//     id: "1",
//     email: "admin@example.com",
//     password: await bcrypt.hash("password123", 10),
//     name: "Admin User",
//     role: "ADMIN", // ADMIN | MANAGER | USER
//     permissions: ["read:users", "write:users", "delete:users", "manage:settings"],
//   },
//   {
//     id: "2",
//     email: "manager@example.com",
//     password: await bcrypt.hash("password123", 10),
//     name: "Manager User",
//     role: "MANAGER",
//     permissions: ["read:users", "write:users"],
//   },
//   {
//     id: "3",
//     email: "user@example.com",
//     password: await bcrypt.hash("password123", 10),
//     name: "Regular User",
//     role: "USER",
//     permissions: ["read:dashboard"],
//   },
// ];

// export const authConfig = {
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         const user = users.find((u) => u.email === credentials.email);
//         if (!user) return null;

//         const isValid = await bcrypt.compare(
//           credentials.password as string,
//           user.password
//         );

//         if (!isValid) return null;

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//           permissions: user.permissions,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//         token.permissions = user.permissions;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.sub;
//         session.user.role = token.role as string;
//         session.user.permissions = token.permissions as string[];
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin",
//     error: "/auth/error",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// } satisfies NextAuthConfig;


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "../../../server/prismaClient";
// import { verifyPassword } from "@/lib/bcrypt";

// export const authOptions = {
//   session: { strategy: "jwt" },
//   pages: { signIn: "/auth/login" },
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("credentials hitting")
//         console.log(credentials?.email,credentials?.password)
//         if (!credentials?.email || !credentials?.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email as string },
//         });

//         if (!user?.password) return null;

//         const isValid = await verifyPassword(credentials.password as string, user.password);
//         if (!isValid) return null;
//         console.log("password_valid and user ",isValid , user)
//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) token.role = user.role;
//       return token;
//     },
//     session({ session, token }) {
//       if (token.sub) session.user.id = token.sub;
//       if (token.role) session.user.role = token.role as string;
//       return session;
//     },
//   },
//   trustHost: true,
// };

// // export const { handlers, signIn, signOut } = NextAuth(authOptions);
// const handler = NextAuth(authOptions);

// // Export both ways – both are used in production apps
// export { handler as GET, handler as POST };
// export default handler;