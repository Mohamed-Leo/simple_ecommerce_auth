import axios from "axios";

export const fetchRemoveCartItem = async (id: string) => {
  try {
    const response = await axios.delete(`/api/cart/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to remove cart item:", error);
    throw error;
  }
};
