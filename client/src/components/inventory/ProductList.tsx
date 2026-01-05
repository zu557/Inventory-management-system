// components/inventory/ProductList.tsx
'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';

type Product = {
  id: string;
  name: string;
  sku: string;
  quantityInStock: number;
  reorderLevel: number;
  salePrice: number;
  category: { name: string };
  supplier: { name: string };
  purchasePrice: number;
  unit: string;
  categoryId: string;
  supplierId: string;
};

export default function ProductList() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const { data: products, error, mutate } = useSWR<Product[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, fetcher);

  if (error) return <div>Error loading products</div>;
  console.log("products fetched prodcts page :", products)
  console.log("error fetching prodcts page :", error)
  if (!products) return <div>Loading...</div>;

  const lowStock = products.filter(p => p.quantityInStock <= p.reorderLevel);

  return (<>
    <div className="bg-white rounded-lg shadow">
      {lowStock.length > 0 && (
        <div className="bg-red-50 p-4 rounded-t-lg">
          <p className="text-red-700 font-medium">
            ⚠️ {lowStock.length} items are low in stock!
          </p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className={product.quantityInStock <= product.reorderLevel ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{product.sku}</td>
                <td className="px-6 py-4">
                  <span className={`font-medium ${product.quantityInStock <= product.reorderLevel ? 'text-red-600' : 'text-green-600'}`}>
                    {product.quantityInStock}
                  </span>
                </td>
                <td className="px-6 py-4">${product.salePrice}</td>
                <td className="px-6 py-4 text-sm">{product.category.name}</td>
                <td className="px-6 py-4 text-sm">{product.supplier.name}</td>
                <td className="px-6 py-4 text-right">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeletingProduct(product)}
                  className="text-red-600 hover:underline font-medium"
                >
                  Delete
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   {/* Edit Modal */}
   {editingProduct && (
      <EditProductModal
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
      />
    )}
  {deletingProduct && (
    <DeleteProductModal
      product={deletingProduct}
      onClose={() => setDeletingProduct(null)}
        />
      )}
    </>
  );
}