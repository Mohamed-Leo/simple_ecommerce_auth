import type { Product } from "@/types/mainTypes";
import { toast } from "sonner";

export const handleUpdateProduct = (product: Product) => {
  toast.info(`Update functionality for "${product.name}" goes here`);
  // In a real app, this would open a dialog or navigate to an edit page
};
