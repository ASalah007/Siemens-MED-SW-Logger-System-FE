const BASEURL = "http://egc-med-tesla:8080/";

const urls = {
  listDatabases: "database/urls",
};

Object.entries(urls).map(([k, v]) => (urls[k] = BASEURL + v));

export async function fetchDatabases() {
  const response = await fetch(urls.listDatabases);
  const data = await response.json();
  return data["databasesNames"];
}
