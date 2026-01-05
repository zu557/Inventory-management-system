"use client"
import { signOut, useSession } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="flex justify-between p-4 bg-gray-100">
      {session ? (
        <>
          <span>{session.user?.email}</span>
          <button onClick={() => signOut()} className="text-blue-600">
            Logout
          </button>
        </>
      ) : (
        <a href="/login" className="text-blue-600">
          Login
        </a>
      )}
    </nav>
  )
}
