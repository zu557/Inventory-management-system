// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route"
// import { redirect } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
// import Sidebar from "@/components/layout/Sidebar";

export default async function ManagerDashboard() {
  // const session = authClient.useSession(); 

  // if (!session.data?.user) {
  //     redirect("/login");
  // }
  // const session = await getServerSession(authOptions);
  // if (!session?.user) redirect("/login");
  // if (!["manager", "admin"].includes(session.user.role)) redirect("/unauthorized");
  // const username = session.user.username
 
  return (<main >
    {/* // <div className="flex min-h-screen"> */}
      {/* <Sidebar role="manager" /> */}
      
      <h1 className="text-4xl font-bold mb-6">Manager Dashboard</h1>
      <p>Only Managers and Admins can access this page.</p>
      
      {/* Add reports, approvals, etc. */}
      </main>

  );
}


