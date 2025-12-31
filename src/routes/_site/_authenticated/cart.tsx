import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@/types/mainTypes";
import { fetchUserCart } from "@/utils/fetchUserCart";
import { fetchRemoveCartItem } from "@/utils/fetchRemoveCartItem";
import { fetchUpdateCartItem } from "@/utils/fetchUpdateCartItem";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import RouteError from "@/components/global/RouteError";
import LoaderSpinner from "@/components/global/LoaderSpinner";

export const Route = createFileRoute("/_site/_authenticated/cart")({
  component: CartPage,
  loader: async () => {
    const cartData = await fetchUserCart();
    return cartData;
  },
  pendingComponent: () => <LoaderSpinner msg="Loading your cart..." />,
  errorComponent: RouteError,
});

function CartPage() {
  const cartItems: CartItem[] = Route.useLoaderData();
  const router = useRouter();

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await fetchUpdateCartItem(id, newQuantity);
      router.invalidate();
    } catch (_error) {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      await fetchRemoveCartItem(id);
      router.invalidate();
      toast.success("Item removed");
    } catch (_error) {
      toast.error("Failed to remove item");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <div className="bg-slate-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-10 w-10 text-slate-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Look like you haven't added anything to your cart yet. Explore our
          products and find something you love!
        </p>
        <Button asChild size="lg">
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Browse Products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">
            You have {cartItems.length} items in your cart.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden border-slate-200">
                <CardContent className="p-0 flex flex-col sm:flex-row">
                  <div className="w-full sm:w-40 h-40 bg-slate-100 relative shrink-0">
                    {item.product.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-slate-400">
                        <ShoppingBag className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-between p-6 grow">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          ${parseFloat(item.product.price).toFixed(2)} each
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-slate-400 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <div className="flex items-center border border-slate-200 rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-8 w-8 rounded-none border-r border-slate-200 cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8 rounded-none border-l border-slate-200 cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="font-bold text-lg">
                        $
                        {(
                          parseFloat(item.product.price) * item.quantity
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${subtotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full text-lg py-6 cursor-pointer"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Tax included at checkout where applicable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
