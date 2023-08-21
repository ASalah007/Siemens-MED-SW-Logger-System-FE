import React, { useState } from "react";
import MiniTable from "../MiniTable/MiniTable";
import Folder from "./Folder";
import MiniArray from "../MiniArray/MiniArray";
import ShowInTable from "../ShowInTable/ShowInTable";

export default function RFolder(props) {
  let { data, tablesEntries = [] } = props;

  let valuesObject = getValuesObject(data);
  let objects = getObjects(data);
  let valuesArray = getValuesArray(data);

  const [tableView, setTableView] = useState(false);
  let tableColumns = [];
  let tableData = [[]];
  let actionElements = <></>;

  try {
    if (tablesEntries.includes(props.title)) {
      const entries = Object.entries(objects).map(([k, o]) =>
        getValuesObjectRecursivly({ id: k, ...o })
      );
      tableColumns = Object.keys(entries[0]);
      tableData = entries.map((e) => tableColumns.map((c) => e[c]));
      actionElements = (
        <ShowInTable
          onClick={() => setTableView(true)}
          open={tableView}
          onClose={() => setTableView(false)}
          title="Macs Informations"
          columns={tableColumns}
          data={tableData}
        />
      );
    }
  } catch (err) {
    console.log("check RFolder", err);
  }

  return (
    <Folder {...props} actionElements={actionElements}>
      {valuesArray && <MiniArray data={valuesArray} title="Values" />}

      {valuesObject && <MiniTable data={valuesObject} />}

      {objects &&
        Object.keys(objects)
          .filter((k) => objects[k] !== null && objects[k] !== undefined)
          .map((k) => (
            <RFolder
              title={data[k]?.id || k}
              data={data[k]}
              tablesEntries={tablesEntries}
            />
          ))}
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

function getValuesObjectRecursivly(object) {
  let values = getValuesObject(object) || {};
  const objects = getObjects(object);
  if (!objects) return values;

  const rest = Object.entries(objects)
    .map(([k, o]) => getValuesObjectRecursivly(o))
    .concat([values])
    .reduce((acc, val) => {
      const newAcc = { ...acc };
      Object.entries(val).forEach(([k, v]) => {
        if (Object.keys(newAcc).includes(k))
          newAcc[`${k}2`] = v; // TODO: better hanlding for repetitive keys
        else newAcc[k] = v;
      });
      return newAcc;
    }, {});

  return rest;
}
