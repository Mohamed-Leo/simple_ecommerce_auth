import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RouteError from "@/components/global/RouteError";
import { AddToCartButton } from "@/components/features/AddToCartButton";
import { getProductsQueryOptions } from "@/hooks/products-query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import LoaderSpinner from "@/components/global/LoaderSpinner";
import FilterByCategory from "@/components/features/FilterByCategory";
import ProductSearch from "@/components/features/ProductSearch";
import { Search } from "lucide-react";
import useFilterProducts from "@/hooks/useFilterProducts";

export const Route = createFileRoute("/_site/products")({
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData(getProductsQueryOptions);
  },
  component: RouteComponent,
  pendingComponent: () => (
    <LoaderSpinner
      className="h-[calc(100vh-100px)] bg-transparent"
      msg="Loading products..."
    />
  ),
  errorComponent: RouteError,
});

function RouteComponent() {
  const { data: products } = useSuspenseQuery(getProductsQueryOptions);

  const {
    filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isPending,
  } = useFilterProducts(products);

  return (
    <div className="container mx-auto py-12 px-4 min-h-screen">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Our Products
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover our curated selection of premium items.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <ProductSearch value={searchQuery} onChange={setSearchQuery} />
            <div className="w-full sm:w-48">
              <FilterByCategory
                value={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-200 ${
            isPending ? "opacity-40" : "opacity-100"
          }`}
        >
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border-slate-200 pt-0"
            >
              <div className="relative group">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-96 group-hover:scale-105 transition-transform duration-500"
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
                <CardDescription className="line-clamp-2 text-xs">
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

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed rounded-2xl bg-slate-50/50">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <Search className="h-8 w-8 text-slate-300" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">
              No products found
            </h2>
            <p className="text-slate-500 mt-2 max-w-xs mx-auto">
              We couldn't find any products matching your current search or
              filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-6 text-primary font-medium hover:underline underline-offset-4"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
