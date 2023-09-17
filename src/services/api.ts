import axios, { AxiosInstance } from "axios";

const axiosRequest: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN || "",
  headers: {
    //
  },
});

axiosRequest.interceptors.request.use(
  (config) => {
    const accessToken = "";
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
    return Promise.reject(error);
  }
);

export default axiosRequest;
