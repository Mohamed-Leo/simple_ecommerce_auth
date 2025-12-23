import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, Package } from "lucide-react";
import { fetchGetProducts } from "@/utils/fetchGetProducts";
import RouteError from "@/components/global/RouteError";
import LoaderSpinner from "@/components/global/LoaderSpinner";
import { handleDeleteProduct } from "@/utils/handleDeleteProduct";
import { AlertDialogBox } from "@/components/custom/AlertDialogBox";
import { DialogFormBox } from "@/components/custom/DialogFormBox";
import { handleUpdateProduct } from "@/utils/handleUpdateProduct";
import UpdateProductForm from "@/components/features/UpdateProductForm";

export const Route = createFileRoute("/admin/products")({
  component: RouteComponent,
  loader: async () => {
    const products = await fetchGetProducts();
    return products;
  },
  errorComponent: RouteError,
  pendingComponent: () => <LoaderSpinner />,
});

function RouteComponent() {
  const products = Route.useLoaderData();

  const tableHeaders = [
    "Image",
    "Name",
    "Category",
    "Price",
    "Stock",
    "Actions",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500">Manage your product catalog</p>
        </div>
        <Button variant={"secondary"}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-accent">
            <TableRow>
              {tableHeaders.map((header) => (
                <TableHead key={header} className="text-center">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-slate-500"
                >
                  No products found. Add your first product to get started.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow
                  key={product.id}
                  className="hover:bg-slate-50 transition-colors text-center"
                >
                  <TableCell className="flex justify-center items-center">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-30 w-30 rounded-md object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center border border-slate-200">
                        <Package className="h-5 w-5 text-slate-400" />
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="font-medium text-slate-900">
                    {product.name}
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.category || "Uncategorized"}
                    </span>
                  </TableCell>

                  <TableCell className="text-slate-600">
                    ${parseFloat(product.price).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${product.stock < 10 ? "text-amber-600" : "text-slate-600"}`}
                    >
                      {product.stock}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <DialogFormBox
                        trigger={
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-slate-600 hover:text-indigo-600 border-slate-200"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        }
                        title={`Update Product (${product.name})`}
                        description={`Update the (${product.name}) product details`}
                        actionName="Update"
                        action={() => handleUpdateProduct(product)}
                      >
                        <UpdateProductForm product={product} />
                      </DialogFormBox>

                      <AlertDialogBox
                        actionName="Delete"
                        action={() =>
                          handleDeleteProduct(product.id, product.name)
                        }
                        title={`Are you sure you want to delete the (${product.name}) product?`}
                        description="This action cannot be undone. This will permanently delete your product and remove it from our servers."
                        trigger={
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-slate-600 hover:text-red-600 border-slate-200 hover:border-red-100 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
