import api from "@/api";
import { router } from "@/router";
import { toast } from "sonner";

export const handleDeleteProduct = async (id: string, name: string) => {
  try {
    const response = await api.delete(`/products/${id}`);

    if (response.status === 200) {
      toast.success(`Product "${name}" deleted`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.invalidate();
    } else toast.error("Failed to delete product");
  } catch (error) {
    console.error(error);
    toast.error("An error occurred");
  }
};
