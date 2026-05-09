import axios from "axios";

const api = axios.create({
  baseURL: "https://kitchen-app-backend-harn.onrender.com/api",
});

export default api;