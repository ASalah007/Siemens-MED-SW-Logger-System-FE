import axios from "axios";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { APIURL, login } from "./services";
import { urls } from "./services";

const authAxios = axios.create();
authAxios.defaults.baseURL = APIURL;

const loginURL =
  window.location.protocol + "//" + window.location.host + urls.login;

authAxios.interceptors.request.use(
  function (config) {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (!token) {
      window.location.replace(loginURL);
      throw new Error("Request Canceled by interceptor");
    }
    const payload = jwtDecode(token);

    if (!payload || !payload.exp || Date.now() > payload.exp * 1000) {
      window.location.replace(loginURL);
      throw new Error("Request Canceled by interceptor");
    }

    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },

  function (err) {
    console.log("interceptor error", err);
  }
);

export async function fetchAllUnactiveUsers() {
  const response = await authAxios.get("/admin/unactiveusers");
  return response.data;
}

export async function fetchUserData() {
  const response = await authAxios.get("/user");
  return response.data.data.user;
}
