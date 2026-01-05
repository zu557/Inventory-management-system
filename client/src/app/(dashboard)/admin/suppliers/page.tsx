"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import AddSupplierModal from "@/components/admin/AddSupplierModal";
import EditSupplierModal from "@/components/admin/EditSupplierModal";
import DeleteSupplierModal from "@/components/admin/DeleteSupplierModal";

type Supplier = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  contactPerson: string | null;
};

export default function AdminSuppliersPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [deletingSupplier, setDeletingSupplier] = useState<Supplier | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: suppliers = [], mutate } = useSWR<Supplier[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/suppliers`,
    fetcher
  );

  const filteredSuppliers = suppliers.filter(sup =>
    sup.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const paginatedSuppliers = filteredSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 md:p-10 min-h-screen">
      <div className="mb-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Suppliers</h1>
            <p className="text-gray-600 mt-2">Manage suppliers</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add Supplier
          </button>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search suppliers..."
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
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Contact Person</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedSuppliers.map((sup) => (
              <tr key={sup.id}>
                <td className="px-6 py-4">{sup.name}</td>
                <td className="px-6 py-4">{sup.email || "N/A"}</td>
                <td className="px-6 py-4">{sup.phone || "N/A"}</td>
                <td className="px-6 py-4">{sup.contactPerson || "N/A"}</td>
                <td className="px-6 py-4 text-right space-x-4">
                  <button onClick={() => setEditingSupplier(sup)} className="text-blue-600">Edit</button>
                  <button onClick={() => setDeletingSupplier(sup)} className="text-red-600">Delete</button>
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
      {showAdd && <AddSupplierModal onClose={() => setShowAdd(false)} onSuccess={mutate} />}
      {editingSupplier && <EditSupplierModal supplier={editingSupplier} onClose={() => setEditingSupplier(null)} onSuccess={mutate} />}
      {deletingSupplier && <DeleteSupplierModal supplier={deletingSupplier} onClose={() => setDeletingSupplier(null)} onSuccess={mutate} />}
    </div>
  );
}