import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Product } from "@/types/mainTypes";

const UpdateProductForm = ({ product }: { product: Product }) => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <Label htmlFor="name-1">Name</Label>
        <Input id="name-1" name="name" defaultValue={product.name} />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="username-1">Username</Label>
        <Input id="username-1" name="username" defaultValue={product.name} />
      </div>
    </div>
  );
};

export default UpdateProductForm;
