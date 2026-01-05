// components/modals/UserDeleteModal.tsx
'use client';

import { useState } from 'react';
import { authClient } from "@/lib/client-auth";

type User = {
  id: string;
  name: string | null;
  email: string;
};

type Props = {
  user: User;
  onClose: () => void;
  onDeleted: () => void; // Callback after successful deletion
};

export default function UserDeleteModal({ user, onClose, onDeleted }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    try {
      // Assuming you have authClient.admin.removeUser
      const { error } = await authClient.admin.removeUser({
        userId: user.id,
      });

      if (error) throw new Error(error.message || 'Failed to delete user');

      onDeleted(); // Trigger parent refresh
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-rose-600 px-8 py-5 text-white">
          <h2 className="text-2xl font-bold text-center">Delete User</h2>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-gray-700 text-lg">
              Are you sure you want to delete this user?
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 text-center">
            <p className="font-semibold text-gray-900 text-lg">
              {user.name || "Unnamed User"}
            </p>
            <p className="text-gray-600 mt-1">{user.email}</p>
          </div>

          <p className="text-center text-sm text-red-700 font-medium">
            This action <strong>cannot be undone</strong>. The user will lose access immediately.
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl text-center">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-4 p-6 bg-gray-50 border-t">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 disabled:opacity-70 transition flex items-center justify-center gap-2"
          >
            {loading && <span className="animate-spin">⚙</span>}
            Yes, Delete User
          </button>
        </div>
      </div>
    </div>
  );
}