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
  return response.data;
}

export async function fetchDatabases() {
  const response = await authAxios.get(urls.listDatabases);
  return response.data["databasesNames"];
}

export async function fetchTestSuites(limit, page, filter) {
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  if (!connectedDatabase) return [];

  const params = { databaseName: connectedDatabase, limit, page };
  if (filter === "passed") params.status = true;
  else if (filter === "failed") params.status = false;

  const response = await authAxios.get(urls.listTestSuites, { params });
  return response.data;
}

export async function fetchTestCases(testSuitId, limit, page, filter) {
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  if (!connectedDatabase) return [];

  const params = { databaseName: connectedDatabase, limit, page };
  if (filter === "passed") params.status = true;
  else if (filter === "failed") params.status = false;

  const url = urls.getTestCases.replace("{testSuitId}", testSuitId);
  const response = await authAxios.get(url, { params });

  return response.data["results"];
}

export async function fetchValidationTags(testCaseId, limit, page, filter) {
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  if (!connectedDatabase) return [];

  const params = { databaseName: connectedDatabase, limit, page };
  if (filter === "passed") params.status = true;
  else if (filter === "failed") params.status = false;

  const url = urls.getValidationTags.replace("{testCaseId}", testCaseId);
  const response = await authAxios.get(url, { params });
  return response.data["results"];
}

export async function fetchValidationPoints(
  validationTagId,
  limit,
  page,
  filter
) {
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  if (!connectedDatabase) return [];
  const url = urls.getValidationPoints.replace(
    "{validationTagId}",
    validationTagId
  );

  const params = { databaseName: connectedDatabase, limit, page };
  if (filter === "passed") params.status = true;
  else if (filter === "failed") params.status = false;

  const response = await authAxios.get(url, { params });
  return response.data["results"];
}

export async function fetchSearchPageOptions() {
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  if (!connectedDatabase) return {};

  const response = await authAxios.get(urls.getSearchPageOptions, {
    params: { databaseName: connectedDatabase },
  });
  const obj = response.data.data;
  const newObj = {
    testSuites: {
      "Meta Data": { ...obj.test_suites, id: obj.test_suites.incrementalId },
    },
    validationPoints: {
      Levels: obj.validation_point,
      "Meta Data": { id: obj.validation_point.incrementalId },
    },
    validationTags: {
      "Meta Data": obj.validation_tag,
    },
    testCases: {
      "Meta Data": { ...obj.test_cases, id: obj.test_cases.incrementalId },
    },
  };
  return newObj;
}

export async function fetchStatistics() {
  const databaseName = sessionStorage.getItem("connectedDatabase");
  if (!databaseName) return {};

  const response = await authAxios.get(urls.getStatistics, {
    params: { databaseName },
  });

  return response.data.data;
}

export async function fetchSearch({
  returnResult,
  testSuitesValues,
  testCasesValues,
  validationTagsValues,
  validationPointsValues,
  testSuiteId = "",
  testCaseId = "",
  validationTagId = "",
  validationPointId = "",

  limit,
  page,
  filter,
}) {
  const databaseName = sessionStorage.getItem("connectedDatabase");
  if (!databaseName) return {};
  let url = urls.search;
  url += `?databaseName=${databaseName}`;
  if (limit) url += `&limit=${limit}`;
  if (page) url += `&page=${page}`;

  const body = {
    select: returnResult,
    testSuites: {
      ...testSuitesValues["Meta Data"],
      status: testSuitesValues["Meta Data"].status.map((s) => s === "true"),
      _id: testSuiteId ? [testSuiteId] : [],
      incrementalId: testSuitesValues["Meta Data"].id.map((i) => parseInt(i)),
      design_info: {
        dut_instance_info: {
          sa_configuration: testSuitesValues["SA Configuration"],
          mpg_configuration: testSuitesValues["MPG Configuration"],
        },
      },
    },

    testCases: {
      _id: testCaseId ? [testCaseId] : [],
      status: testCasesValues["Meta Data"].status.map((s) => s === "true"),
      incrementalId: testCasesValues["Meta Data"].id.map((i) => parseInt(i)),
    },

    validationTags: {
      ...validationTagsValues["Meta Data"],
      status: validationTagsValues["Meta Data"].status.map((s) => s === "true"),
      _id: validationTagId ? [validationTagId] : [],
      incrementalId: [],
    },

    validationPoints: {
      ...validationPointsValues.Levels,
      mac: validationPointsValues.Levels.mac,
      status: validationPointsValues.Levels.status.map((s) => s === "true"),
      _id: validationPointId ? [validationPointId] : [],
      incrementalId: validationPointsValues["Meta Data"].id.map((i) =>
        parseInt(i)
      ),
    },
  };

  const response = await authAxios.post(url, body);
  return response.data;
}

export async function deleteDatabase(databaseName) {
  try {
    const response = await authAxios.delete(urls.deleteDatabase, {
      data: { databaseName },
    });
    return response.data;
  } catch (err) {
    return { status: "fail", message: err.message };
  }
}

export async function deleteTestSuite(testSuiteId) {
  try {
    const url = urls.deleteTestSuite.replace("{testSuiteId}", testSuiteId);
    const response = await authAxios.delete(url);
    return response.data;
  } catch (err) {
    return { status: "fail", message: err.message };
  }
}
