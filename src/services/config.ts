import axios from "axios";
import { Token } from "./types";
const axiosConfig = axios.create({
  baseURL: "https://api.homologation.cliqdrive.com.br/auth",
});

axiosConfig.interceptors.request.use(
  (config) => {
    let tokenString = localStorage.getItem("tokens");

    if (tokenString) {
      const token: Token = JSON.parse(tokenString);
      config.headers.Authorization = `Bearer ${token.access}`;
    }
    config.headers.Accept = "application/json;version=v1_web";
    return config;
  },
  (error) => Promise.reject(error)
);

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      return {
        data: {
          status: error.response.status,
          detail: error.response.data,
        },
      };
    }
  }
);

export default axiosConfig;
