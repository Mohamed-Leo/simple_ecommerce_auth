import axios from "axios";

export const fetchUserCart = async () => {
  try {
    const response = await axios.get("/api/cart", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user cart:", error);
    return error;
  }
};
