import axios from "axios";
const BASEURL = "http://egc-med-tesla:8080/";

const urls = {
  listDatabases: "database/urls",
  listTestSuites: "TestSuites",
  getTestCases: "testCases/testSuite/{testSuitId}",
  getValidationTags: "validationTags/testCases/{testCaseId}",
  getValidationPoints: "validationPoints/validationtag/{validationTagId}",
  getSearchPageOptions: "search/",
  getStatistics: "statistics/",
  search: "search/",
  deleteDatabase: "database/urls",
};

Object.entries(urls).map(([k, v]) => (urls[k] = BASEURL + v));

export async function fetchDatabases() {
  const response = await fetch(urls.listDatabases);
  const data = await response.json();
  return data["databasesNames"];
}

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
  const newObj = {
    testSuites: {
      "Meta Data": obj.test_suites,
    },
    validationPoints: {
      Levels: obj.validation_point,
    },
    validationTags: {
      "Meta Data": obj.validation_tag,
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

  let status = [];
  if (filter === "passed") status = [true];
  if (filter === "failed") status = [false];

  const body = {
    select: returnResult,
    testSuites: {
      ...testSuitesValues["Meta Data"],
      _id: testSuiteId,
      design_info: {
        dut_instance_info: {
          sa_configuration: testSuitesValues["SA Configuration"],
          mpg_configuration: testSuitesValues["MPG Configuration"],
        },
      },
    },
    testCases: { _id: testCaseId, status: [] }, //TODO change this
    validationTags: {
      ...validationTagsValues["Meta Data"],
      _id: validationTagId,
    },
    validationPoints: {
      ...validationPointsValues.Levels,
      _id: validationPointId,
    },
  };

  console.log(body);
  const response = await axios.post(url, body);
  return response.data;
}

export async function deleteDatabase(databaseName) {
  try {
    const response = await axios.delete(urls.deleteDatabase, {
      params: { databaseName },
    });
    return response.data;
  } catch (err) {
    return { status: "fail", message: err.message };
  }
}
