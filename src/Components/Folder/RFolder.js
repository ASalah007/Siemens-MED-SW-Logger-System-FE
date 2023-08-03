import React from "react";
import MiniTable from "../MiniTable/MiniTable";
import Folder from "./Folder";
import MiniArray from "../MiniArray/MiniArray";

export default function RFolder(props) {
  const { data } = props;

  if (!Array.isArray(data)) {
    var values = getValues(data);
    var objects = getObjects(data);
  }
  console.log(data);
  console.log("oj:", objects);

  return (
    <Folder {...props}>
      {Array.isArray(data) && <MiniArray data={data} title="Values" />}

      {!Array.isArray(data) && Object.keys(values).length ? (
        <MiniTable data={values} />
      ) : (
        ""
      )}

      {!Array.isArray(data) && Object.keys(objects).length
        ? Object.keys(objects).map((k) => <RFolder title={k} data={data[k]} />)
        : ""}
    </Folder>
  );
}

function getValues(data) {
  return Object.fromEntries(
    Object.entries(data).filter(([k, v]) => typeof v !== "object")
  );
}
function getObjects(data) {
  return Object.fromEntries(
    Object.entries(data).filter(([k, v]) => typeof v === "object")
  );
}
