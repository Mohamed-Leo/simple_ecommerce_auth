import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ProductSchema,
  type ProductSchemaType,
} from "@/lib/validations/ProductSchema";

const useAddProductForm = () => {
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      imageUrl: "",
      categoryId: "",
      description: "",
      stock: 0,
    },
  });

  return {
    form,
  };
};

export default useAddProductForm;
