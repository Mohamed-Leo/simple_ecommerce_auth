import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchGetProducts } from "@/utils/fetchGetProducts";
import RouteError from "@/components/global/RouteError";
import { AddToCartButton } from "@/components/features/AddToCartButton";

export const Route = createFileRoute("/_site/products")({
  loader: async () => {
    const products = await fetchGetProducts();
    return products;
  },
  component: RouteComponent,
  errorComponent: RouteError,
});

function RouteComponent() {
  const products = Route.useLoaderData();

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Our Products</h1>
          <p className="text-muted-foreground mt-2">
            Discover our curated selection of premium items.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border-slate-200 pt-0"
            >
              <div className="aspect-square bg-slate-100 relative group">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-slate-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                )}
                {product.category && (
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-slate-600 border border-slate-200">
                    {product.category}
                  </div>
                )}
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg line-clamp-1">
                  {product.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 h-10 text-xs">
                  {product.description || "No description available."}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 grow">
                <div className="text-xl font-bold text-primary">
                  ${parseFloat(product.price).toFixed(2)}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <AddToCartButton productId={product.id} />
              </CardFooter>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-slate-500">
              No products found.
            </h2>
            <p className="text-slate-400 mt-2">
              Come back later for new arrivals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
