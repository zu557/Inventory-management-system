// app/(dashboard)/layout.tsx   ← This remains a Server Component (no 'use client'!)

import { AuthProvider } from "@/lib/DashboardClientWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}