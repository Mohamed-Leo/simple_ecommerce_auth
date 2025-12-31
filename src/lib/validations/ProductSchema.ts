import z from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required."),
  price: z.number().min(1, "Price is required."),
  imageUrl: z.string().min(1, "Image URL is required."),
  categoryId: z.string().min(1, "Category is required."),
  description: z.string().min(1, "Description is required."),
  stock: z.number().min(1, "Stock is required."),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;
