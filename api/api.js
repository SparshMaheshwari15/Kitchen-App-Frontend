import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: "https://kitchen-app-backend-harn.onrender.com/api",
  // baseURL: "http://192.168.135.125:5000/api",
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