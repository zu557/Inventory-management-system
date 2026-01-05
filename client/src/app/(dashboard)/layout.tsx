
// import { getServerSession } from "next-auth";
// app/dashboard/layout.tsx
// import { authOptions } from "../api/auth/[...nextauth]/route"
// import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);
  // if (!session?.user) redirect("/login");

  return <>{children}</>;
}