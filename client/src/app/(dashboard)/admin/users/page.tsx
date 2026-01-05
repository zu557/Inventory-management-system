"use client"
import { useEffect, useState } from "react";
import { authClient } from "@/lib/client-auth";
import UserCreateModal from "@/components/admin/UserCreateModal";
import UserDeleteModal from "@/components/admin/UserDeleteModal";
import { Copy, Check, Plus, UserPlus } from "lucide-react";

type Role = "admin" | "manager" | "staff";
type User = {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  createdAt: string;
};
 
type CreatedUser = {
  email: string;
  password: string;
  name: string;
  role: Role;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [successUser, setSuccessUser] = useState<CreatedUser | null>(null);
  const [copiedField, setCopiedField] = useState<"email" | "password" | null>(null);

  async function loadUsers() {
    setLoading(true);
    const { data, error } = await authClient.admin.listUsers( {
     query: {
      sortBy: "createdAt",
      sortDirection: "desc" }
  });
    if (!error && data?.users) {
      setUsers(data.users as User[]);
    }
    setLoading(false);
  }


  useEffect(() => {
    loadUsers();
  }, []);

  const handleUserCreated = (createdUser: CreatedUser) => {
    setSuccessUser(createdUser);
    loadUsers(); // Refresh in background
  };

  const copyToClipboard = async (text: string, field: "email" | "password") => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getRoleBadge = (role: Role) => {
    const styles = {
      admin: "bg-purple-100 text-purple-800 border-purple-200",
      manager: "bg-blue-100 text-blue-800 border-blue-200",
      staff: "bg-green-100 text-green-800 border-green-200",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${styles[role]}`}
      >
        {role}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <UserPlus className="w-6 h-6 text-blue-600 animate-pulse" />
          </div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage roles and access for your team members</p>
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Add New User
          </button>
        </div>
      </div>

      {/* Users Table Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700">Role</th>
                <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700">Joined</th>
                <th className="px-8 py-5 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="text-gray-500">
                      <UserPlus className="w-16 h-16 mx-auto mb-4 opacity-40" />
                      <p className="text-lg">No users yet</p>
                      <p className="text-sm mt-2">Click "Add New User" to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`transition-colors duration-150 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50`}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name || "Unnamed User"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-700 font-medium">{user.email}</td>
                    <td className="px-8 py-6">{getRoleBadge(user.role)}</td>
                    <td className="px-8 py-6 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <button className="text-blue-600 hover:text-blue-800 font-medium transition">
                          Edit
                        </button>
                        <button
                          onClick={() => setDeletingUser(user)}
                          className="text-red-600 hover:text-red-800 font-medium transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreate && (
        <UserCreateModal
          onClose={() => setShowCreate(false)}
          onCreated={handleUserCreated}
        />
      )}
      {deletingUser && (
        <UserDeleteModal
          user={deletingUser}
          onClose={() => setDeletingUser(null)}
          onDeleted={() => loadUsers()}
        />
      )}
      {/* Success Modal - Compact & Horizontal Layout */}
      {successUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-5 text-white">
              <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-3">
                <Check className="w-7 h-7" />
                User Created Successfully!
              </h2>
            </div>

            {/* Body - Compact with Horizontal Fields */}
            <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserPlus className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-700 text-sm">Share these credentials securely with the new user.</p>
              </div>

              {/* Horizontal Grid: Name & Role on top, Email + Password side-by-side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-lg font-semibold text-gray-900">{successUser.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Role</label>
                    <div>{getRoleBadge(successUser.role)}</div>
                  </div>
                </div>

                {/* Right Column - Email & Password stacked but full width */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="flex items-center gap-3">
                      <code className="flex-1 bg-gray-100 px-4 py-3 rounded-xl text-sm font-medium break-all">
                        {successUser.email}
                      </code>
                      <button
                        onClick={() => copyToClipboard(successUser.email, "email")}
                        className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition shrink-0"
                      >
                        {copiedField === "email" ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Temporary Password</label>
                    <div className="flex items-center gap-3">
                      <code className="flex-1 bg-gray-100 px-4 py-3 rounded-xl text-sm font-mono font-bold">
                        {successUser.password}
                      </code>
                      <button
                        onClick={() => copyToClipboard(successUser.password, "password")}
                        className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition shrink-0"
                      >
                        {copiedField === "password" ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-center text-sm text-amber-700 bg-amber-50 px-4 py-3 rounded-xl">
                  <strong>Important:</strong> This password will not be shown again. Ask the user to change it on first login.
                </p>
              </div>

              {/* Done Button */}
              <div className="pt-2">
                <button
                  onClick={() => setSuccessUser(null)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}