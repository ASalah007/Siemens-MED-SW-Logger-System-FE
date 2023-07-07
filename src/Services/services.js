import axios from "axios";
import Cookies from "universal-cookie";
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
  const cookies = new Cookies();
  const connectedDatabase = cookies.get("connectedDatabase");
  if (!connectedDatabase) return [];

  const response = await axios.get(urls.listTestSuites, {
    params: { databaseName: connectedDatabase },
  });
  return response.data;
}

export async function fetchTestCases(testSuitId) {
  const connectedDatabase = new Cookies().get("connectedDatabase");
  if (!connectedDatabase) return [];

  const url = urls.getTestCases.replace("{testSuitId}", testSuitId);
  const response = await axios.get(url, {
    params: { databaseName: connectedDatabase },
  });

  return response.data["results"];
}

export async function fetchValidationTags(testCaseId) {
  const connectedDatabase = new Cookies().get("connectedDatabase");
  if (!connectedDatabase) return [];

  const url = urls.getValidationTags.replace("{testCaseId}", testCaseId);
  const response = await axios.get(url, {
    params: { databaseName: connectedDatabase },
  });
  return response.data["results"];
}

export async function fetchValidationPoints(validationTagId) {
  const connectedDatabase = new Cookies().get("connectedDatabase");
  if (!connectedDatabase) return [];
  const url = urls.getValidationPoints.replace(
    "{validationTagId}",
    validationTagId
  );
  const response = await axios.get(url, {
    params: { databaseName: connectedDatabase },
  });
  return response.data["results"];
}
