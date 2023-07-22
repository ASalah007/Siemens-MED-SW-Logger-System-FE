import axios from "axios";
const BASEURL = "http://egc-med-tesla:8080/";

const urls = {
  listDatabases: "database/urls",
  listTestSuites: "TestSuites",
  getTestCases: "testCases/testSuite/{testSuitId}",
  getValidationTags: "validationTags/testCases/{testCaseId}",
  getValidationPoints: "validationPoints/validationtag/{validationTagId}",
  getSearchPageOptions: "search/",
};

Object.entries(urls).map(([k, v]) => (urls[k] = BASEURL + v));

export async function fetchDatabases() {
  const response = await fetch(urls.listDatabases);
  const data = await response.json();
  return data["databasesNames"];
}

export async function fetchTestSuites() {
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  if (!connectedDatabase) return [];

  const response = await axios.get(urls.listTestSuites, {
    params: { databaseName: connectedDatabase },
  });
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

export async function fetchValidationTags(testCaseId, limit, page) {
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  if (!connectedDatabase) return [];

  const url = urls.getValidationTags.replace("{testCaseId}", testCaseId);
  const response = await axios.get(url, {
    params: { databaseName: connectedDatabase, limit, page },
  });
  return response.data["results"];
}

export async function fetchValidationPoints(validationTagId, limit, page) {
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  if (!connectedDatabase) return [];
  const url = urls.getValidationPoints.replace(
    "{validationTagId}",
    validationTagId
  );
  const response = await axios.get(url, {
    params: { databaseName: connectedDatabase, limit, page },
  });
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
  console.log(newObj);
  return newObj;
}
