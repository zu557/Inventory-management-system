import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prismaClient";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  plugins: [
    admin({
      adminRoles: ["admin"],
      impersonation: true,
    }),
  ],

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  trustedOrigins: ["http://localhost:3000"],

  advanced: {
    defaultCookieAttributes: {
      sameSite: "lax",
      secure: false,
    },
  },

  user: {
    additionalFields: {
      role: {
        // type: "string",
        type: "enum",
        values: ["admin", "manager", "staff"],
        input: false, // ✅ cannot be set by user
      },
    },

    // ✅ THIS is how you expose fields into session
    select(user) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    },
  },
});

  // }),
  //
 
 // user: {
  //   async select(user) {
  //     return {
  //       id: user.id,
  //       email: user.email,
  //       name: user.name,
  //       role: user.role, // 👈 expose role
  //     };
  //   },
  // },
// import { betterAuth } from "better-auth";
// import prisma from "./prismaClient.js";
// import bcrypt from "bcrypt";

// export const auth = betterAuth({
//   emailAndPassword: { 
//     enabled: true,
//     autoSignIn: false,

//     async authorize({ email, password }: { email: string; password: string }) {
//       const user = await prisma.user.findUnique({
//         where: { email },
//       });

//       if (!user) return null;

//       const match = await bcrypt.compare(password, user.password);
//       if (!match) return null;

//       return { id: user.id, email: user.email };
//     }
//   },

//   database: {
//     type: "prisma",
//     client: prisma,
//     userModel: "User"
//   },

//   trustedOrigins: ["http://localhost:3000"],

//   session: {
//     freshAge: 60 * 60 * 24 * 7 // 7 days
//   }
// });
