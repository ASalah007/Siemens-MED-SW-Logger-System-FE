import React, { useState } from "react";
import ShowInTable from "../../ShowInTable/ShowInTable.js";
import RFolder from "../../Folder/RFolder.js";

function VPEntry({ data, onClick, active }) {
  const [resultsTableView, setResultsTableView] = useState(false);
  let resultsColumns = [];
  let resultsData = [];

  if (data.results) {
    resultsColumns = Object.keys(data.results[0]);
    resultsData = data.results.map((e) => {
      if (e.status.toLowerCase() === "pass") e.status = "🟢";
      if (e.status.toLowerCase() === "fail") e.status = "🔴";

      return Object.keys(e).map((k) => e[k]);
    });
  }

  let failedCount = 0;
  let totalCount = 0;
  if (data.results) {
    failedCount = data.results.reduce(
      (acc, ele) => (acc += ele.status === "fail"),
      0
    );
    totalCount = data.results.length;
  }

  const title = `Validation Point(${data.incrementalId})`;
  console.log("data", data);

  return (
    <div>
      <RFolder
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
        data={{
          "Meta Data": {
            ...data.metaData,
            creation_date: data.creation_date,
            failed_results: failedCount,
            total_results: totalCount,
          },
          levels: data.levels,
        }}
      />
    </div>
  );
}

export default VPEntry;
