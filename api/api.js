import axios from "axios";

const api = axios.create({
//   baseURL: "https://kitchen-app-backend-harn.onrender.com/api",
  baseURL: "http://192.168.0.199:5000/api",
});

export default api;