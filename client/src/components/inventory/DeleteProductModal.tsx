// components/inventory/DeleteProductModal.tsx
'use client';

import { useState } from 'react';
import { mutate } from 'swr';

type Product = {
  id: string;
  name: string;
};

export default function DeleteProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${product.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete product');
      }

      setSuccess(true);
      mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`); // Refresh list
      setTimeout(() => onClose(), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-red-700">Delete Product</h2>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete the product:
          </p>
          <p className="font-semibold text-lg text-gray-900 bg-gray-100 px-4 py-3 rounded-lg">
            {product.name}
          </p>
          <p className="text-sm text-gray-600 mt-4">
            This action <strong>cannot be undone</strong>.
          </p>

          {/* Feedback */}
          {success && (
            <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-lg text-center font-medium">
              ✓ Product deleted successfully!
            </div>
          )}
          {error && (
            <div className="mt-4 bg-red-50 text-red-700 p-4 rounded-lg text-center">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 p-6 border-t bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            disabled={loading || success}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading || success}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-70 transition flex items-center gap-2"
          >
            {loading && <span className="animate-spin">⚙</span>}
            {success ? 'Deleted!' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}