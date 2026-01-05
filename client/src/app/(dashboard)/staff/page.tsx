// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Sidebar from "@/components/layout/Sidebar";

// // type Session = {
// //   user?: {
// //     id: string;
// //     email: string;
// //     role: string;
// //   };
// // };

// export default function StaffDashboard() {
//   const router = useRouter();
//   const [session, setSession] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getSession = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:5000/api/auth/get-session",
//           {
//             credentials: "include",
//           }
//         );

//         if (!res.ok) {
//           setSession(null);
//           return;
//         }

//         const data = await res.json();
//         setSession(data);
//         console.log("session in staff page :", data)
//       } catch (err) {
//         console.error("Session fetch failed:", err);
//         setSession(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getSession();
//   }, []);

//   // ⏳ wait until fetch finishes
//   if (loading) return <div>Loading session...</div>;

//   // 🚫 redirect AFTER render
//   if (!session?.user) {
//     router.push("/login");
//     return null;
//   }

//   return (
//     <div className="min-h-screen flex">
//       <Sidebar role="STAFF" />

//       <main className="flex-1 ml-64 p-10">
//         <h1 className="text-2xl font-bold mb-6">
//           Welcome {session.user.name}({session.user.role})
//         </h1>

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
//     </div>
//   );
// }


"use client"
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route"
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar"
import Sidebar from "@/components/layout/Sidebar";
import { authClient } from "@/lib/client-auth";
import { useEffect, useState } from "react";


export default  function StaffDashboard() {
  const router = useRouter();
  // const [ready, setReady] = useState(false);
  
  // const getSession = async () => {
  //   const res = await fetch("http://localhost:5000/api/auth/get-session", {
  //     credentials: "include", // important!
  //   });
  //   return res.json();
  // };
  // const session = getSession()

  // const  session  = authClient.useSession();
  // const { data, isPending } = authClient.useSession();
  // console.log("session data :",data)
  // const name = data?.user?.name
  // const role = data?.user?.role
  // console.log("name and role are :",name , role)
  // if (isPending) return <p>Loading...</p>;

  // if (!data?.user) {
  //   router.push("/login");
  //   return null;
  // }

  // useEffect(() => {
  //   if (session) {
  //     console.log("Session found:", session);
  //     setReady(true);
  //   }
  // }, [session]);
  // if (!ready) return <div>Loading session...</div>;

  // if (!session) {
  //   router.push("/login");
  //   return null; // Prevent rendering before redirect
  // }
  // const sessions = await authClient.listSessions()
  // // // if (!session) {
  // // //     console.log("this is from staff dashboard in session login condition")
  // // //     redirect("/login");
  // // // }
  // console.log("list of sessions :",sessions)
  // console.log("error through looking session :",error)
  // if (!session) {
  //  router.push("/staff");
  // }
  // const { data: session } = await authClient.getSession();

  // if (!session?.user) {
  //   router.push("/login");
  //   return;
  // }
  return (
      // 1. Sidebar is fixed (w-64)
      <div className="min-h-screen flex">
       <Sidebar role="staff" />
       {/* <Sidebar  /> */}
        
        {/* 2. Main Content Area */}
        {/* ml-64 (margin-left: 16rem/256px) pushes the content past the fixed sidebar. */}
        {/* p-10 provides internal padding. */}
        <main className="flex-1 ml-64 p-10">
        {/* {data && <>
          <h1 className="text-4xl font-bold mb-4">Welcome, {name|| data?.user?.email}</h1>
        <p className="text-xl text-gray-600">Role: {role}</p> 
        </>} */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-xl shadow">Total Items: 8,421</div>
          <div className="bg-yellow-50 p-8 rounded-xl shadow">Low Stock: 47</div>
          <div className="bg-green-50 p-8 rounded-xl shadow">Warehouse Value: $1.2M</div>
        </div>
      </main>
    </div>
  );
}
