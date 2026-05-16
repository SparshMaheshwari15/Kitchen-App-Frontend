import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = __DEV__
  ? "http://192.168.0.199:5000/api"
  : "https://kitchen-app-backend-harn.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
});
api.interceptors.request.use(
  async (config) => {

    const phone =
      await AsyncStorage.getItem(
        "devPhone"
      );

    if (phone) {

      config.headers[
        "x-dev-phone"
      ] = phone;
    }

    return config;
  },

  (error) => {
    return Promise.reject(
      error
    );
  }
);
export default api;