// import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
// import { getCurrentUser } from "@/lib/auth/getCurrentUser";
// import { getServerSession } from "@/lib/auth";


export default async function DashboardLayout({ children }: {
    children: React.ReactNode;
  }) {
    // const session = await getServerSession();
    // const user = await getCurrentUser();
    // console.log("user called from admin layout :",user) 
    // if (!user) redirect("/login");
    // if (user.role !== "admin") redirect("/unauthorized");
    // console.log("this session is from admin layout :", session)

        //   <Sidebar role="admin" user={session?.user.name} actualRole={session?.user.role} />
    // 
    return (
      <div className="flex min-h-screen">
        <aside className="w-64 fixed inset-y-0 left-0 bg-gray-800">
           <Sidebar role="admin"  />
        </aside>
  
        <main className="ml-64 flex-1 p-6">
          {children}
        </main>
      </div>
    );
  }
   