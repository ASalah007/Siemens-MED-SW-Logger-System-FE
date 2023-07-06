const BASEURL = "http://egc-med-tesla:3001/";

const urls = {
  listDatabases: "database/urls",
};

Object.entries(urls).map(([k, v]) => (urls[k] = BASEURL + v));

export async function fetchDatabases() {
  try {
    console.log(urls.listDatabases);
    const response = await fetch(urls.listDatabases);
    const data = await response.json();
    console.log(data);
    return data["databasesName"];
  } catch (error) {
    console.log(error);
  }
}
