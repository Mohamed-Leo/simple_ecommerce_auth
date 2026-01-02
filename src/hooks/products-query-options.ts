import { ProductQueryKeys } from "@/constants/queryKeys";
import { fetchGetProducts } from "@/utils/fetchGetProducts";
import { queryOptions } from "@tanstack/react-query";

const getProductsQueryOptions = queryOptions({
  queryKey: ProductQueryKeys.getProducts,
  queryFn: fetchGetProducts,
  staleTime: 60 * 60 * 1000, // 1 hour
});

export { getProductsQueryOptions };
