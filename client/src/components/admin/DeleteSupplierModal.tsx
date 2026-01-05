// components/admin/DeleteSupplierModal.tsx
'use client';

import { useState } from 'react';

type Supplier = {
  id: string;
  name: string;
};

type Props = {
  supplier: Supplier;
  onClose: () => void;
  onSuccess: () => void;
};

export default function DeleteSupplierModal({ supplier, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    try {
      // Check linked purchases
      const resCount = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/suppliers/${supplier.id}/purchase-count`);
      const { count } = await resCount.json();
      if (count > 0) throw new Error('Cannot delete: Purchases are linked to this supplier');

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/suppliers/${supplier.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete supplier');

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Delete Supplier?</h2>
        <p className="mb-4">Are you sure you want to delete "{supplier.name}"?</p>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleDelete} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded">
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}