import { customAxios } from "../axiosHelper";
import { API_URL } from "@/constants/App";
import store from "@/store";

const authHelper = (user, errorMsg, redirectToTodo, route) => {
  customAxios
    .post(API_URL + route, {
      ...user,
    })
    .then((_res) => {
      localStorage.setItem("user-token", _res.data.token);
      localStorage.setItem("user", JSON.stringify(_res.data.user));
      console.log(_res.data.user);
      store.commit("setUser", _res.data.user);
      redirectToTodo();
    })
    .catch((_rej) => {
      errorMsg.value.push(_rej);
    });
};

export default authHelper;
