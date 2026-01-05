"use client";
import { useState, useCallback, useRef } from "react";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/client-auth";

type Role = "staff" | "manager" | "admin";

type Props = {
  onSuccess?: (createdUser: { email: string; password: string; name: string; role: Role }) => void;
  onClose?: () => void;
};

export default function RegisterForm({ onSuccess, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<Role>("staff");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      const formData = new FormData(e.currentTarget);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const password = String(formData.get("password") || "");

      try {
        const { data, error: apiError } = await authClient.admin.createUser({
          email,
          password,
          name: name || null,
          role,
        });

        if (apiError) {
          setError(apiError.message || "Failed to create user");
        } else if (data?.user) {
          formRef.current?.reset();
          setRole("staff");

          onSuccess?.({
            email,
            password,
            name: name || email.split("@")[0],
            role,
          });

          onClose?.();
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [role, onSuccess, onClose]
  );

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="space-y-7">
      {/* Name Field */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <label htmlFor="name" className="text-sm font-medium text-gray-700 text-right">
          Name <span className="text-gray-400">(optional)</span>
        </label>
        <div className="md:col-span-2">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            placeholder="John Doe"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 text-right">
          Email <span className="text-red-500">*</span>
        </label>
        <div className="md:col-span-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Role Field */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <label htmlFor="role" className="text-sm font-medium text-gray-700 text-right">
          Role <span className="text-red-500">*</span>
        </label>
        <div className="md:col-span-2">
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: "right 1rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em" }}
          >
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Password Field */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <label htmlFor="password" className="text-sm font-medium text-gray-700 text-right">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="md:col-span-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            placeholder="••••••••••"
          />
          <p className="mt-2 text-xs text-gray-500">Minimum 8 characters</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-start-2 md:col-span-2">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="md:col-start-2 md:col-span-2 flex gap-3 justify-end">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 flex items-center justify-center gap-2 min-w-32"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              "Create User"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}