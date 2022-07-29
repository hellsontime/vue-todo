export const API_URL = process.env.VUE_APP_API_HOST
  ? process.env.VUE_APP_API_HOST + process.env.VUE_APP_API_BASE_PATH
  : "http://localhost:8081/api/v1";

export const LOGIN_API_ROUTE = "/login";
export const REGISTER_API_ROUTE = "/register";
export const LOGOUT_API_ROUTE = "/logout";
export const TODOS_API_ROUTE = "/todos";
export const STATUS_API_ROUTE = "/status";
