import React, { useState } from "react";
import Folder from "../../Folder.js";
import MiniTable from "../../MiniTable/MiniTable.js";
import ShowInTable from "../../ShowInTable/ShowInTable.js";

function VPEntry({ data, num, onClick, active }) {
  const [resultsTableView, setResultsTableView] = useState(false);
  let resultsColumns = [];
  let resultsData = [];

  if (data.results) {
    console.log("results: ", data.results[0]);
    resultsColumns = Object.keys(data.results[0]);
    resultsData = data.results.map((e) => {
      const v = Object.values(e);
      v[1] = v[1] === "pass" ? "🟢" : "🔴";
      return v;
    });
  }

  const failedCount =
    (!data.status
      ? data.results.reduce((acc, ele) => (acc += ele.status === "fail"), 0) +
        "/"
      : "") + data.results.length;

  const levels = Object.values(data.levels)
    .map((e, i) => (i > 0 ? "/" + e : e))
    .join("");

  const title = `VP ${num} -- ${failedCount} -- (${levels})`;

  return (
    <div>
      <Folder
        title={
          <span
            className={
              "font-bold text-lg " +
              (data.status ? "text-success" : "text-fail")
            }
          >
            {title}
          </span>
        }
        onClick={onClick}
        actionElements={
          <ShowInTable
            onClick={() => setResultsTableView(true)}
            open={resultsTableView}
            onClose={() => setResultsTableView(false)}
            title="Validation Point Results"
            columns={resultsColumns}
            data={resultsData}
          />
        }
      >
        <Folder title="Meta Data">
          <MiniTable keys={Object.keys(data.metaData)} data={data.metaData} />
        </Folder>
        <Folder title="Levels">
          <MiniTable keys={Object.keys(data.levels)} data={data.levels} />
        </Folder>
      </Folder>
    </div>
  );
}

export default VPEntry;
