import "better-auth";

declare module "better-auth" {
  interface BetterAuthSessionUser {
    role: string;
    username: string;
  }

  interface BetterAuthUser {
    role: string;
    username: string;
  }
}
