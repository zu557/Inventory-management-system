
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Navbar from "@/components/layout/Navbar"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

    const role = session.user.role
  
    if (role !== "ADMIN" && role !== "MANAGER") {
      return <h1 className="p-8 text-red-600">Access Denied</h1>
    }
  

  return (
    <div className="p-8">
      <Navbar/>
      <h1 className="text-2xl font-bold">Welcome, {session.user?.username}</h1>
      <p>Email: {session.user?.email}</p>
    </div>
  )
}

// the second one which changed
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";

// export default async function Dashboard() {
//   const session = await auth();

//   if (!session?.user) {
//     redirect("/login");
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl">Welcome, {session.user.name || session.user.email}!</h1>
//       <p>Your user ID: {session.user.id}</p>
//       {/* Fetch user's tasks here */}
//     </div>
//   );
// }


// the first one which changed
// import Sidebar from "@/components/layout/Sidebar";
// import ProtectedRoute from "@/components/layout/ProtectedRoute";
// import useAuth from "@/hooks/useAuth";

// export default function DashboardPage() {
//   const { user } = useAuth(); // client component call

//   return (
//     <ProtectedRoute roles={["ADMIN", "MANAGER", "STAFF"]}>
//       <div className="flex">
//         <Sidebar role={user?.role || "STAFF"} />
//         <main className="p-6 flex-1">
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//           <section className="grid grid-cols-3 gap-4 mt-6">
//             <div className="card p-4">Total Products: <strong>120</strong></div>
//             <div className="card p-4">Low Stock: <strong>8</strong></div>
//             <div className="card p-4">Today's Sales: <strong>$2,300</strong></div>
//           </section>
//           <section className="mt-6">
//             <h2 className="text-lg font-semibold">Recent Sales</h2>
//             {/* Table component */}
//           </section>
//         </main>
//       </div>
//     </ProtectedRoute>
//   );
// }
