import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string
    role: "ADMIN" | "MANAGER" | "STAFF"
    email: string
    username?: string
  }

  interface Session {
    user: {
      id: string
      email: string
      username?: string
      role: "ADMIN" | "MANAGER" | "STAFF"
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string
      email: string
      username?: string
      role: "ADMIN" | "MANAGER" | "STAFF"
    }
  }
}
