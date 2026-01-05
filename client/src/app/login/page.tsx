import LoginForm from '@/components/forms/LoginForm';
import { Package } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header - Compact & Elegant */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
              <Package className="w-9 h-9 text-white" />  
            </div> 
            <h1 className="text-2xl font-bold text-white">StockPro</h1>
            <p className="text-indigo-100 text-sm mt-1">Sign in to your account</p>
          </div> 

          {/* Form Body */}
          <div className="p-8 pt-10">
            <LoginForm />
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} StockPro
          </div>
        </div>
      </div>
    </div>
  );
}

// // src/app/auth/signin/page.tsx
// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <form
//       onSubmit={async (e) => {
//         e.preventDefault();
//         await signIn("credentials", {
//           email,
//           password,
//           redirect: true,
//           callbackUrl: "/dashboard",
//         });
//       }}
//     >
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Sign In</button>
//     </form>
//   );
// }

// "use client";

// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function LoginPage() {
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");

//     const formData = new FormData(e.currentTarget);
//     const res = await signIn("credentials", {
//       email: formData.get("email"),
//       password: String(formData.get("password")),
//       redirect: false,
//     });

//     if (res?.error) {
//       setError("Invalid email or password");
//     } else {
//       router.push("/dashboard/staff");
//       router.refresh();
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-8">Inventory Management</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <input
//             name="email"
//             type="email"
//             required
//             placeholder="email@company.com"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <input
//             name="password"
//             type="password"
//             required
//             placeholder="Password"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           {error && <p className="text-red-600 text-sm text-center">{error}</p>}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
//           >
//             Sign In
//           </button>
//         </form>

//       </div>
//     </div>
//   );
// }
// // // src/app/(auth)/login/page.tsx
