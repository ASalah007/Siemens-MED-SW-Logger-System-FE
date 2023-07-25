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
      "Meta Data": {
        Owner: obj.test_suites.owner,
        Version: obj.test_suites.version,
        Machine: obj.test_suites.machine,
        "Compilation Mode": obj.test_suites.compilation_Mode,
        Platform: obj.test_suites.platform,
        Solution: obj.test_suites.solution,
        "Tool name": obj.test_suites.tool_name,
      },
    },
    validationPoints: {
      Levels: {
        Mac: obj.validation_point.mac,
        Direction: obj.validation_point.direction,
        "Packet Identifier": obj.validation_point.packet_identifier,
      },
    },
    validationTags: {
      "Meta Data": {
        Name: obj.validation_tag.name,
        "Executable Path": obj.validation_tag.executable_path,
      },
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
      status,
      _id: testSuiteId,
      design_info: {
        dut_instance_info: {
          sa_configuration: testSuitesValues["SA Configuration"],
          mpg_configuration: testSuitesValues["MPG Configuration"],
        },
      },
    },
    testCases: { _id: testCaseId, status },
    validationTags: {
      ...validationTagsValues["Meta Data"],
      status,
      _id: validationTagId,
    },
    validationPoints: {
      ...validationPointsValues.Levels,
      status,
      _id: validationPointId,
    },
  };

  const response = await axios.post(url, body);
  return response.data;
}
