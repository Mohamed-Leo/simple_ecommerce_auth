import axios from "axios";

export const fetchAddToCart = async (
  productId: string,
  quantity: number = 1
) => {
  try {
    const response = await axios.post(
      "/api/cart",
      { productId, quantity },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw error;
  }
};
