// src/hooks/useRole.ts
import { useSession } from "next-auth/react";

export function useRole() {
  const { data: session, status } = useSession();

  const isAdmin = session?.user?.role === "ADMIN";
  const isManager = ["ADMIN", "MANAGER"].includes(session?.user?.role || "");
  const hasPermission = (permission: string) =>
    session?.user?.permissions?.includes(permission) || false;

  return {
    role: session?.user?.role,
    isAdmin,
    isManager,
    hasPermission,
    isLoading: status === "loading",
  };
}