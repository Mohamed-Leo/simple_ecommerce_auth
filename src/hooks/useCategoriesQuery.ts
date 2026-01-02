import { fetchGetCategories } from "@/utils/fetchGetCategories";
import type { CategoryType } from "@/types/mainTypes";
import { useQuery } from "@tanstack/react-query";
import { CategoryQueryKeys } from "@/constants/queryKeys";

export const useCategoriesQuery = () => {
  return useQuery<CategoryType[]>({
    queryKey: CategoryQueryKeys.getCategories,
    queryFn: fetchGetCategories,
    staleTime: 24 * 60 * 60 * 1000, // 1 day
  });
};
