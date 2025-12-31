import { useState, useEffect } from "react";
import { fetchGetCategories } from "@/utils/fetchGetCategories";

export const useCategories = () => {
  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchGetCategories();
        setCategories(data);
      } catch (err) {
        setError("Failed to load categories");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
  };
};
