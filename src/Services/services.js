import axios from "axios";
import Cookies from "universal-cookie";

export const APIURL = `http://${window.location.hostname}:8080/`;

export const urls = {
  listDatabases: "database/urls",
  listDatabasesNew: "database/solutions",
  listTestSuites: "TestSuites",
  getTestCases: "testCases/testSuite/{testSuitId}",
  getValidationTags: "validationTags/testCases/{testCaseId}",
  getValidationPoints: "validationPoints/validationtag/{validationTagId}",
  getSearchPageOptions: "search/",
  getStatistics: "statistics/",
  search: "search/",
  deleteDatabase: "database/urls",
  signup: "signup/",
  login: "login/",
  users: "admin/users/",
  deleteTestSuite: "TestSuites/{testSuiteId}",
  getDatabasesWithSolutions: "database/solutions",
};

Object.entries(urls).map(([k, v]) => (urls[k] = APIURL + v));

export async function signup(user) {
  try {
    const response = await axios.post(urls.signup, user);
    const cookies = new Cookies();

    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    cookies.set("token", response.data.token, {
      path: "/",
      expires,
    });

    return response.data;
  } catch (err) {
    // console.log(err);
    throw err;
  }
}

export async function login(credentials) {
  try {
    const response = await axios.post(urls.login, credentials);
    const cookies = new Cookies();

    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    cookies.set("token", response.data.token, {
      path: "/",
      expires,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export function logout() {
  const cookies = new Cookies();
  cookies.remove("token");
  sessionStorage.removeItem("connectedDatabase");
}
