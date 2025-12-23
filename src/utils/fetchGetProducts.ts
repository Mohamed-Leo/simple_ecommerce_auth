import api from "@/api";
import type { Product } from "@/types/mainTypes";

export const fetchGetProducts = async () => {
  const response = await api.get<Product[]>("/products");
  return response.data;
};
