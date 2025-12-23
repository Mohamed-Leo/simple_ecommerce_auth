import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Base URL for the API
  withCredentials: true, // Important for auth cookies
});
export default api;
