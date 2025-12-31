import axios from "axios";

export const fetchGetCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/categories");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};
