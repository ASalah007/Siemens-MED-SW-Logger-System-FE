import axios from "axios";
const BASEURL = "http://egc-med-tesla:8080/";

const urls = {
  listDatabases: "database/urls",
  listTestSuites: "TestSuites",
  getTestCases: "testCases/testSuite/{testSuitId}",
  getValidationTags: "validationTags/testCases/{testCaseId}",
  getValidationPoints: "validationPoints/validationtag/{validationTagId}",
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

export async function fetchTestCases(testSuitId, limit, page) {
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  if (!connectedDatabase) return [];

  const url = urls.getTestCases.replace("{testSuitId}", testSuitId);
  const response = await axios.get(url, {
    params: { databaseName: connectedDatabase, limit, page },
  });

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
