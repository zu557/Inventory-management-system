// Golden Rule (MEMORIZE THIS)

// ❌ Never use client-auth inside Server Components or server utilities
"use client";
import { authClient } from "@/lib/client-auth";

export function useCurrentUser() {
  const { data, isPending } = authClient.useSession();

  return {
    isLoading: isPending,
    user: data?.user
      ? {
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        }
      : null,
  };
}

// import { authClient } from "@/lib/client-auth";
// // or getServerSession / Clerk / Kinde
// import { cookies } from "next/headers";

// export async function getCurrentUser() {
// //   const { data: session } = await authClient.getSession();
//   const cookieStore =  await cookies();

//   const { data: session } = await authClient.getSession({
//     headers: {
//       cookie: cookieStore.toString(),
//     },
//   });
//   if (!session?.user) return null;

//   return {
//     id: session.user.id,
//     name: session.user.name,
//     email: session.user.email,
//     role: session.user.role,
//     // image: session.user.image,
//   };
// }
