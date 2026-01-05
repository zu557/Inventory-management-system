// components/inventory/AddProductModal.tsx
'use client';

import { useState } from 'react';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

type Category = { id: string; name: string };
type Supplier = { id: string; name: string };

export default function AddProductModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // New: success state

  const { data: categories = [], error: catError } = useSWR<Category[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`,
    fetcher
  );
  const { data: suppliers = [], error: supError } = useSWR<Supplier[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/suppliers`,
    fetcher
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      purchasePrice: formData.get('purchasePrice') as string,
      salePrice: formData.get('salePrice') as string,
      quantityInStock: formData.get('quantityInStock') as string,
      reorderLevel: formData.get('reorderLevel') as string,
      unit: formData.get('unit') as string,
      categoryId: formData.get('categoryId') as string,
      supplierId: formData.get('supplierId') as string,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          purchasePrice: parseFloat(data.purchasePrice),
          salePrice: parseFloat(data.salePrice),
          quantityInStock: parseInt(data.quantityInStock),
          reorderLevel: parseInt(data.reorderLevel),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create product(front-end)');
      }

      // Success!
      setSuccess(true);

      // Refetch the product list globally (no reload needed)
      mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);

      // Optional: Auto-close modal after 1.5 seconds
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            disabled={loading}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* All your inputs remain exactly the same */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input name="name" type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g. Wireless Mouse" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU (Unique)</label>
              <input name="sku" type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g. WM-001" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price</label>
              <input name="purchasePrice" type="number" step="0.01" required className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="75.50" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
              <input name="salePrice" type="number" step="0.01" required className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="119.99" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Initial Stock</label>
              <input name="quantityInStock" type="number" required min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="150" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level</label>
              <input name="reorderLevel" type="number" required min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="20" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <input name="unit" type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="pcs, kg, box" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select name="categoryId" required defaultValue="" className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="" disabled>Select category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {catError && <p className="text-red-600 text-sm mt-1">Failed to load categories</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
              <select name="supplierId" required defaultValue="" className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="" disabled>Select supplier...</option>
                {suppliers.map((sup) => (
                  <option key={sup.id} value={sup.id}>{sup.name}</option>
                ))}
              </select>
              {supError && <p className="text-red-600 text-sm mt-1">Failed to load suppliers</p>}
            </div>
          </div>

          {/* Success / Error Messages */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg text-center font-medium">
              ✓ Product created successfully!
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              {loading && <span className="animate-spin">⚙</span>}
              {success ? 'Created!' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}