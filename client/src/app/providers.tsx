"use client"
// import { SessionProvider } from "next-auth/react";
import { InventoryProvider } from "@/context/InventoryContext"
import { UIProvider } from "@/context/UIContext"

export default function Providers({ children }) {
  return (
    // <SessionProvider>
      <InventoryProvider>
        <UIProvider>
          {children}
        </UIProvider>
      </InventoryProvider>
      // </SessionProvider>

  )
}
