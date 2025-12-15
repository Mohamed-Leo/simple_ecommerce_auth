import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/")({
  component: ProductsComponent,
});

function ProductsComponent() {
  return <div className="container mx-auto">Hello "/products/"!</div>;
}
