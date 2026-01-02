import type { Product } from "@/types/mainTypes";
import { useState } from "react";
import { useDebounce } from "./useDebounce";

const useFilterProducts = (products: Product[]) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const filteredProducts = products.filter((product: Product) => {
    const matchesCategory =
      selectedCategory === "all" ||
      !selectedCategory ||
      product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(debouncedSearchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    isPending: searchQuery !== debouncedSearchQuery,
  };
};

export default useFilterProducts;
