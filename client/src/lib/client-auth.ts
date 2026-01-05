
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: "http://localhost:5000",
  plugins: [
      adminClient()
  ],
  session: {
    user: {
      id: true,
      email: true,
      name: true,
      role: true, // ✅ now it will NOT be stripped
    },
  },
});
