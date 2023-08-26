import axios from "axios";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { APIURL, urls } from "./services";

const authAxios = axios.create();
authAxios.defaults.baseURL = APIURL;

const loginURL =
  window.location.protocol + "//" + window.location.host + "/login";

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

export async function fetchUsers(activated) {
  try {
    const response = await authAxios.get(
      urls.users + "?activated=" + activated
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function activateUser(id, approve) {
  try {
    const response = await authAxios.get(
      urls.users + id + "/?approve=" + approve
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function fetchUserData() {
  const response = await authAxios.get("/user");
  return response.data.data.user;
}

export async function fetchAllSolutions() {
  const response = await authAxios.get("/admin/solutions");
  return response.data.data;
}

export async function deleteUser(userId) {
  try {
    const response = await authAxios.delete(`/admin/users/${userId}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function fetchAllActiveUsers() {
  const response = await authAxios.get("/admin/users", {
    params: { activated: true },
  });
  return response.data;
}

export async function updateUser(userId, solutions, deletableDatabases) {
  try {
    const response = await authAxios.patch(`/admin/users/${userId}`, {
      solutions,
      deletableDatabases,
    });
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function fetchDatabasesNew() {
  const response = await authAxios.get(urls.listDatabasesNew);
  console.log(response);
  return response.data;
}
