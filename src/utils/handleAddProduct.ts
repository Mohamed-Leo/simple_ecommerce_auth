import { type ProductSchemaType } from "../lib/validations/ProductSchema";
import { toast } from "sonner";

import axios from "axios";

export const handleAddProduct = async (formData: ProductSchemaType) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/products`,
      formData
    );

    if (response.status === 200) {
      toast.success(response.data.message || "Product added successfully");
      return true;
    }
  } catch (error) {
    let errorMessage = "Failed to add product";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error || errorMessage;
    }
    toast.error(errorMessage);
    return false;
  }
};
