import { customAxios } from "../axiosHelper";
import { LOGOUT_API_ROUTE } from "../../constants/App";
import { API_URL } from "../../constants/App";

const logoutHelper = (setError) => {
  customAxios
    .post(API_URL + LOGOUT_API_ROUTE)
    .then(() => {
      localStorage.clear();
    })
    .catch((_rej) => {
      setError(_rej);
    });
};

export default logoutHelper;
