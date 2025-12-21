import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminComponent,
});

function AdminComponent() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$12,450",
      icon: DollarSign,
      color: "text-green-600",
    },
    { label: "Products", value: "48", icon: Package, color: "text-blue-600" },
    {
      label: "Active Users",
      value: "1,204",
      icon: Users,
      color: "text-purple-600",
    },
    {
      label: "Total Orders",
      value: "256",
      icon: ShoppingCart,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-slate-400">+12% from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 italic text-center py-10">
              No recent activity to show.
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full text-left px-4 py-2 rounded-md hover:bg-slate-100 transition-colors text-sm font-medium">
              📦 Add New Product
            </button>
            <button className="w-full text-left px-4 py-2 rounded-md hover:bg-slate-100 transition-colors text-sm font-medium">
              👥 Manage Users
            </button>
            <button className="w-full text-left px-4 py-2 rounded-md hover:bg-slate-100 transition-colors text-sm font-medium">
              ⚙️ System Settings
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
