import axios from "axios";
import Cookies from "universal-cookie";

export const APIURL = `http://${window.location.hostname}:8080/`;

export const urls = {
  listDatabases: "database/urls",
  listDatabasesNew: "database/dummy_route",
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
};

Object.entries(urls).map(([k, v]) => (urls[k] = APIURL + v));

export async function fetchTestSuites(limit, page, filter) {
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  if (!connectedDatabase) return [];

  const params = { databaseName: connectedDatabase, limit, page };
  if (filter === "passed") params.status = true;
  else if (filter === "failed") params.status = false;

  const response = await axios.get(urls.listTestSuites, { params });
  return response.data;
}

export async function fetchTestCases(testSuitId, limit, page, filter) {
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  if (!connectedDatabase) return [];

  const params = { databaseName: connectedDatabase, limit, page };
  if (filter === "passed") params.status = true;
  else if (filter === "failed") params.status = false;

  const url = urls.getTestCases.replace("{testSuitId}", testSuitId);
  const response = await axios.get(url, { params });

  return response.data["results"];
}

export async function fetchValidationTags(testCaseId, limit, page, filter) {
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  if (!connectedDatabase) return [];

  const params = { databaseName: connectedDatabase, limit, page };
  if (filter === "passed") params.status = true;
  else if (filter === "failed") params.status = false;

  const url = urls.getValidationTags.replace("{testCaseId}", testCaseId);
  const response = await axios.get(url, { params });
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

  const response = await axios.get(url, { params });
  return response.data["results"];
}

export async function fetchSearchPageOptions() {
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  if (!connectedDatabase) return {};

  const response = await axios.get(urls.getSearchPageOptions, {
    params: { databaseName: connectedDatabase },
  });
  const obj = response.data.data;
  console.log(obj);
  const newObj = {
    testSuites: {
      "Meta Data": { ...obj.test_suites, id: obj.test_suites.incrementalId },
    },
    validationPoints: {
      Levels: obj.validation_points,
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

  const response = await axios.get(urls.getStatistics, {
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
      mac: validationPointsValues.Levels.mac
        .map((i) => parseInt(i))
        .filter((i) => !isNaN(i)),
      status: validationPointsValues.Levels.status.map((s) => s === "true"),
      _id: validationPointId ? [validationPointId] : [],
      incrementalId: validationPointsValues["Meta Data"].id.map((i) =>
        parseInt(i)
      ),
    },
  };

  console.log(body);
  const response = await axios.post(url, body);
  return response.data;
}

export async function deleteDatabase(databaseName) {
  try {
    const response = await axios.delete(urls.deleteDatabase, {
      data: { databaseName },
    });
    return response.data;
  } catch (err) {
    return { status: "fail", message: err.message };
  }
}

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
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteTestSuite(testSuiteId) {
  try {
    const url = urls.deleteTestSuite.replace("{testSuiteId}", testSuiteId);
    const response = await axios.delete(url);
    return response.data;
  } catch (err) {
    return { status: "fail", message: err.message };
  }
}
