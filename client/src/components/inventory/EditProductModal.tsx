// components/inventory/EditProductModal.tsx
'use client';

import { useState } from 'react';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

type Category = { id: string; name: string };
type Supplier = { id: string; name: string };

type Product = {
  id: string;
  name: string;
  sku: string;
  purchasePrice: number;
  salePrice: number;
  quantityInStock: number;
  reorderLevel: number;
  unit: string;
  categoryId: string;
  supplierId: string;
};

export default function EditProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { data: categories = [] } = useSWR<Category[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`,
    fetcher
  );
  const { data: suppliers = [] } = useSWR<Supplier[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/suppliers`,
    fetcher
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const updatedData = {
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      purchasePrice: parseFloat(formData.get('purchasePrice') as string),
      salePrice: parseFloat(formData.get('salePrice') as string),
      quantityInStock: parseInt(formData.get('quantityInStock') as string),
      reorderLevel: parseInt(formData.get('reorderLevel') as string),
      unit: formData.get('unit') as string,
      categoryId: formData.get('categoryId') as string,
      supplierId: formData.get('supplierId') as string,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${product.id}`, {
        method: 'PATCH', // or PATCH if your backend supports partial updates
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update product');
      }

      setSuccess(true);
      mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`); // Refetch list
      setTimeout(() => onClose(), 1500);
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
          <h2 className="text-2xl font-bold">Edit Product</h2>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input name="name" type="text" required defaultValue={product.name} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input name="sku" type="text" required defaultValue={product.sku} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price</label>
              <input name="purchasePrice" type="number" step="0.01" required defaultValue={product.purchasePrice} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
              <input name="salePrice" type="number" step="0.01" required defaultValue={product.salePrice} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
              <input name="quantityInStock" type="number" required defaultValue={product.quantityInStock} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level</label>
              <input name="reorderLevel" type="number" required defaultValue={product.reorderLevel} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <input name="unit" type="text" required defaultValue={product.unit} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select name="categoryId" required defaultValue={product.categoryId} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="" disabled>Select category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
              <select name="supplierId" required defaultValue={product.supplierId} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="" disabled>Select supplier...</option>
                {suppliers.map((sup) => (
                  <option key={sup.id} value={sup.id}>{sup.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Feedback Messages */}
          {success && (
            <div className="bg-green-50 text-green-800 p-4 rounded-lg text-center font-medium">
              ✓ Product updated successfully!
            </div>
          )}
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-70 flex items-center gap-2"
            >
              {loading && <span className="animate-spin">⚙</span>}
              {success ? 'Updated!' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}