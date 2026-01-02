import api from "@/api";
import type { ProductSchemaType } from "@/lib/validations/ProductSchema";

export const fetchPostProduct = async (product: ProductSchemaType) => {
  const response = await api.post("/products", product);
  return response;
};
