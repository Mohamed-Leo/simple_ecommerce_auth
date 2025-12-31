import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { fetchAddToCart } from "@/utils/fetchAddToCart";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productId: string;
  className?: string;
}

export function AddToCartButton({
  productId,
  className,
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await fetchAddToCart(productId);
      setSuccess(true);
      toast.success("Added to cart!");
      router.invalidate();
      setTimeout(() => setSuccess(false), 2000);
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Please login to add to cart");
      } else {
        toast.error("Failed to add to cart");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={loading || success}
      className={`w-full cursor-pointer group relative overflow-hidden transition-all duration-300 ${
        success ? "bg-green-600 hover:bg-green-600" : ""
      } ${className}`}
      variant={success ? "default" : "default"}
    >
      <span className="flex items-center justify-center gap-2">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : success ? (
          <Check className="h-4 w-4" />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
        {loading ? "Adding..." : success ? "Added!" : "Add to Cart"}
      </span>
      {!loading && !success && (
        <span className="ml-2 group-hover:translate-x-1 transition-transform">
          →
        </span>
      )}
    </Button>
  );
}
