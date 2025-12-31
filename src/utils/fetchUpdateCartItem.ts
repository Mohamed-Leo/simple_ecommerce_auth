import axios from "axios";

export const fetchUpdateCartItem = async (id: string, quantity: number) => {
  try {
    const response = await axios.patch(
      `/api/cart/${id}`,
      { quantity },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update cart item quantity:", error);
    throw error;
  }
};
