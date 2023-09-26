import axios, { AxiosInstance } from "axios";
import store from "@/store";
import router from "@/router";
import { PATH } from "@/constants/path";

const BASE_URL = process.env.VUE_APP_API_URL + "/api/v1";

const axiosRequest: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    //
  },
  timeout: 20000,
});

axiosRequest.interceptors.request.use(
  (config) => {
    const accessToken =
      localStorage.getItem("token") ||
      store.getters["auth/authState"].access_token;
    if (config.headers) {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch("auth/resetAuth");
      localStorage.clear();
      router.replace({ path: PATH.Login });
    }
    return Promise.reject(error);
  }
);

export default axiosRequest;
