import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ProductSchema,
  type ProductSchemaType,
} from "@/lib/validations/ProductSchema";

import type { Product } from "@/types/mainTypes";

const useUpdateProductForm = (product?: Product) => {
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product?.name || "",
      price: Number(product?.price) || 0,
      imageUrl: product?.imageUrl || "",
      categoryId: product?.category || "",
      description: product?.description || "",
      stock: product?.stock || 0,
    },
  });

  return {
    form,
  };
};

export default useUpdateProductForm;
