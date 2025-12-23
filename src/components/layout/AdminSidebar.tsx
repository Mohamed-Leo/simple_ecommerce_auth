import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Package, Home, LogOut } from "lucide-react";
import { handleSignOut } from "@/utils/handleSignOut";

export function AdminSidebar() {
  const links = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/products", label: "Products", icon: Package },
    { to: "/", label: "Back to Site", icon: Home },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Admin Panel
        </h1>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-slate-800 text-slate-300"
            activeOptions={{ exact: true }}
            activeProps={{
              className: "bg-blue-600/20 text-blue-400 font-medium",
            }}
          >
            <link.icon size={20} />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-red-500/10 text-red-400 transition-colors cursor-pointer"
          onClick={handleSignOut}
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
