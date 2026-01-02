import { useState } from "react";
import { useCategories } from "@/hooks/useCategoriesQuery";
import useUpdateProductForm from "@/hooks/useUpdateProductForm";
import { Controller } from "react-hook-form";

import { handleUpdateProduct } from "@/utils/handleUpdateProduct";

import type { ProductSchemaType } from "@/lib/validations/ProductSchema";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Product } from "@/types/mainTypes";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { SelectBox } from "@/components/custom/SelectBox";
import { Edit } from "lucide-react";
import { router } from "@/router";

const UpdateProductForm = ({ product }: { product: Product }) => {
  const [open, setOpen] = useState(false);

  const {
    form: {
      handleSubmit,
      register,
      control,
      formState: { errors, isSubmitting },
    },
  } = useUpdateProductForm(product);

  const onSubmit = async (formData: ProductSchemaType) => {
    const success = await handleUpdateProduct(product.id, formData);
    if (success) setOpen(false);
    router.invalidate(); // refresh the page
  };

  const { categories, isLoading } = useCategories();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 cursor-pointer text-slate-600 hover:text-indigo-600 border-slate-200"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="leading-6">
              Update the {`(${product.name})`} Product
            </DialogTitle>
            <DialogDescription>
              Update the {`(${product.name})`} product details
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              <FieldError>{errors.name?.message}</FieldError>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
              />
              <FieldError>{errors.price?.message}</FieldError>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" {...register("imageUrl")} />
              <FieldError>{errors.imageUrl?.message}</FieldError>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <SelectBox
                    id="categoryId"
                    value={field.value as string}
                    onValueChange={field.onChange}
                    options={categories}
                    isLoading={isLoading}
                    placeholder="Select a category"
                  />
                )}
              />
              <FieldError>{errors.categoryId?.message}</FieldError>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input id="description" {...register("description")} />
              <FieldError>{errors.description?.message}</FieldError>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                {...register("stock", { valueAsNumber: true })}
              />
              <FieldError>{errors.stock?.message}</FieldError>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Spinner /> Updating...
                </span>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductForm;
