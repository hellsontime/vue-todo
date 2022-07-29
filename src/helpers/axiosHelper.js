import { API_URL, LOGIN_API_ROUTE, REGISTER_API_ROUTE } from "@/constants/App";
import axios from "axios";

export const errorHandler = (rej) => {
  switch (rej.response?.status) {
    case 401:
      return `${rej.response?.data?.message}`;
    case 404:
      return `${rej.response?.data?.message}`;
    case 405:
      return `${rej.response?.data?.message}`;
    case 500:
      return `${rej.response?.data?.message}`;
    case 502:
      return `${rej.response?.data?.message}`;
    default:
      return "Something went wrong";
  }
};

export const customAxios = axios.create(
  { baseURL: API_URL },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);
customAxios.interceptors.request.use((req) => {
  if (req.url !== (LOGIN_API_ROUTE || REGISTER_API_ROUTE)) {
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      "Access-Control-Allow-Origin": "*",
    };
  }
  return req;
});

customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorDescription = errorHandler(error);
    return Promise.reject(errorDescription);
  }
);
