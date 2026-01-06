// components/AuthProvider.tsx  (or DashboardClientWrapper.tsx)
"use client";

import { useCurrentUser } from "@/lib/auth/getCurrentUser";
import  Sidebar from "@/components/layout/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, isLoading } = useCurrentUser();
  const router = useRouter();
  console.log("user in DashdboardClientWrapper : ",user)
  // Redirect to login if not authenticated (after loading)
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect is handling it
  }

  return (
      <div className="flex min-h-screen">
      <aside className="w-64 fixed inset-y-0 left-0 bg-gray-800">
         <Sidebar role={user.role as "admin" | "manager" | "staff"}  />
      </aside>

      <main className="ml-64 flex-1 p-6">
        {children}
      </main>
    </div>
  );
}