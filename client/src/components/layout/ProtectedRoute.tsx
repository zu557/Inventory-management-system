"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) return router.push("/login");
      if (roles && !roles.includes(user.role)) return router.push("/dashboard");
    }
  }, [user, loading, roles, router]);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
}
