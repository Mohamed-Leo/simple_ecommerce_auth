import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="flex flex-row min-h-screen bg-slate-50">
      <AdminSidebar />

      <div className="flex-1 h-screen overflow-y-auto">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-8 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-slate-800">
            Welcome to Admin Panel
          </h2>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
