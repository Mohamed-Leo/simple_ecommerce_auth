import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/products")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-background">Hello "/admin/products"!</div>;
}
