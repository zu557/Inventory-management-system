// app/(dashboard)/inventory/page.tsx
'use client';

import { useState } from 'react';
import ProductList from '@/components/inventory/ProductList';
import AddProductModal from '@/components/inventory/AddProductModal';

export default function InventoryPage() { 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header + Add Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Product
          </button>
        </div>

        {/* Product List */}
        <ProductList />

        {/* Modal */}
        {isAddModalOpen && (
          <AddProductModal onClose={() => setIsAddModalOpen(false)} />
        )}
      </div>
    </div>
  );
}
// app/(dashboard)/inventory/page.tsx
// import ProductList from '@/components/inventory/ProductList';

// export default function InventoryPage() {
//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-8">Inventory Management</h1>
//       <ProductList />
//     </div>
//   );
// }