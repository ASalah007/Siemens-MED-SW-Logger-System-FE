import React from "react";
import MiniTable from "../MiniTable/MiniTable";
import Folder from "./Folder";
import MiniArray from "../MiniArray/MiniArray";
import { object } from "prop-types";

export default function RFolder(props) {
  let { data } = props;

  let valuesObject = getValuesObject(data);
  let objects = getObjects(data);
  let valuesArray = getValuesArray(data);

  return (
    <Folder {...props}>
      {valuesArray && <MiniArray data={valuesArray} title="Values" />}

      {valuesObject && <MiniTable data={valuesObject} />}

      {objects &&
        Object.keys(objects)
          .filter((k) => objects[k])
          .map((k) => <RFolder title={data[k]?.id || k} data={data[k]} />)}
    </Folder>
  );
}

function getValuesObject(data) {
  if (!data || Array.isArray(data)) return null;

  const o = Object.fromEntries(
    Object.entries(data).filter(([k, v]) => typeof v !== "object")
  );
  if (Object.values(o).length) return o;
  return null;
}

function getObjects(data) {
  if (!data) return null;

  if (Array.isArray(data)) {
    const d = data.filter((e) => typeof e === "object");
    if (d.length) return d;
  }

  const o = Object.fromEntries(
    Object.entries(data).filter(([k, v]) => typeof v === "object")
  );

  if (Object.values(o).length) return o;

  return null;
}

function getValuesArray(data) {
  if (Array.isArray(data)) {
    const d = data.filter((e) => typeof e !== "object");
    if (d.length) return d;
  }

  return null;
}
