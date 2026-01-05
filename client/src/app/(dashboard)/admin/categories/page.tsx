"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import AddCategoryModal from "@/components/admin/AddCategoryModal";
import EditCategoryModal from "@/components/admin/EditCategoryModal";
import DeleteCategoryModal from "@/components/admin/DeleteCategoryModal";

type Category = {
  id: string;
  name: string;
  description: string | null;
  // Add more fields if needed
};

export default function AdminCategoriesPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: categories = [], mutate } = useSWR<Category[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`,
    fetcher
  );

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 md:p-10 min-h-screen">
      <div className="mb-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600 mt-2">Manage inventory categories</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-6 w-full max-w-md p-3 border rounded-lg"
      />

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedCategories.map((cat) => (
              <tr key={cat.id}>
                <td className="px-6 py-4">{cat.name}</td>
                <td className="px-6 py-4">{cat.description || "No description"}</td>
                <td className="px-6 py-4 text-right space-x-4">
                  <button onClick={() => setEditingCategory(cat)} className="text-blue-600">Edit</button>
                  <button onClick={() => setDeletingCategory(cat)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>

      {/* Modals */}
      {showAdd && <AddCategoryModal onClose={() => setShowAdd(false)} onSuccess={mutate} />}
      {editingCategory && <EditCategoryModal category={editingCategory} onClose={() => setEditingCategory(null)} onSuccess={mutate} />}
      {deletingCategory && <DeleteCategoryModal category={deletingCategory} onClose={() => setDeletingCategory(null)} onSuccess={mutate} />}
    </div>
  );
}