import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/products")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="container mx-auto py-6">Hello "/_site/products"!</div>;
}
