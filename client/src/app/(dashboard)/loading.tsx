// src/app/(dashboard)/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="flex-1 p-4 md:p-8 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div>
        <div className="h-10 bg-gray-200 rounded-lg w-64 mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-96"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="h-10 bg-gray-300 rounded-lg w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-40 mt-3"></div>
          </div>
        ))}
      </div>

      {/* Table or Content Skeleton */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
        </div>
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-12 bg-gray-200 rounded-lg w-12"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded-full w-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}