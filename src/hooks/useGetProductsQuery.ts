import { useQuery } from "@tanstack/react-query";
import { fetchGetProducts } from "@/utils/fetchGetProducts";

const useGetProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchGetProducts(),
  });
};

export default useGetProductsQuery;
