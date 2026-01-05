import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex min-h-screen">
        <aside className="w-64 fixed inset-y-0 left-0 bg-gray-800">
          <Sidebar role="manager" />
        </aside>
  
        <main className="ml-64 flex-1 p-6">
          {children}
        </main>
      </div>
    );
  }
   