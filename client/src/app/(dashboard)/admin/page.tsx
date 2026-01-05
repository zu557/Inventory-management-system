// export default async function AdminPage() {
//   return (
//     <>
//       {/* 2. Main Content Area */}
//       <main className="ml-64 p-10">
//         <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-8 rounded-xl shadow">
//             Total Items: 8,421
//           </div>

//           <div className="bg-yellow-50 p-8 rounded-xl shadow">
//             Low Stock: 47
//           </div>

//           <div className="bg-green-50 p-8 rounded-xl shadow">
//             Warehouse Value: $1.2M
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// import { authOptions } from "@/app/api/auth/[...nextauth]/route"
// import { getServerSession } from "next-auth/next"
// import { redirect } from "next/navigation"
// import Sidebar from "@/components/layout/Sidebar"
// import { authClient } from "@/lib/client-auth";

export default async function AdminPage() {

  // const { data: session, error } = await authClient.getSession()
  // console.log("Session data in the admin page",session)
  // console.log("Session error in the admin page",error)
    // if (!session?.user) {
    //     redirect("/login");
    // }

  // const session = await getServerSession(authOptions)

  // if (session.user.role !== "admin") {
  // redirect("/unauthorized")
  // }
  // const username = session.user.username || "User"
  return (<main > 
    {/* // 1. Sidebar is fixed (w-64) */}
    {/* <div className="min-h-screen flex"> */}
      {/* <Sidebar role="admin" /> */}
      
      {/* 2. Main Content Area */}
      {/* ml-64 (margin-left: 16rem/256px) pushes the content past the fixed sidebar. */}
      {/* p-10 provides internal padding. */}
      
        {/* <h1 className="text-4xl font-bold mb-4">Welcome, {session.user.username || session.user.email}</h1> */}
        {/* <p className="text-xl text-gray-600">Role: {session.user.role}</p> */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-xl shadow">Total Items: 8,421</div>
          <div className="bg-yellow-50 p-8 rounded-xl shadow">Low Stock: 47</div> 
          <div className="bg-green-50 p-8 rounded-xl shadow">Warehouse Value: $1.2M</div>
        </div>
      </main>
  );
}


// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { prisma } from "../../../../../server/prismaClient";
// import { getServerSession } from "next-auth";

// export default async function AdminDashboard() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard/staff");

//   const users = await prisma.user.findMany({ orderBy: { email: "asc" } });

//   return (
//     <div className="p-10">
//       <h1 className="text-4xl font-bold mb-6">Admin Panel</h1>
//       <div className="bg-white rounded-xl shadow overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-4 text-left">Email</th>
//               <th className="px-6 py-4 text-left">Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(u => (
//               <tr key={u.id} className="border-t">
//                 <td className="px-6 py-4">{u.email}</td>
//                 <td className="px-6 py-4">{u.role}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }