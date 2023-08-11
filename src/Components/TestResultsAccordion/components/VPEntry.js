import React, { useState } from "react";
import Folder from "../../Folder/Folder.js";
import MiniTable from "../../MiniTable/MiniTable.js";
import ShowInTable from "../../ShowInTable/ShowInTable.js";
import RFolder from "../../Folder/RFolder.js";

function VPEntry({ data, num, onClick, active }) {
  const [resultsTableView, setResultsTableView] = useState(false);
  let resultsColumns = [];
  let resultsData = [];

  if (data.results) {
    resultsColumns = Object.keys(data.results[0]);
    resultsData = data.results.map((e) => {
      if (e.status.toLowerCase() === "pass") e.status = "🟢";
      if (e.status.toLowerCase() === "fail") e.status = "🔴";

      return Object.values(e);
    });
  }

  let failedCount = "-- 0";
  if (data.results) {
    failedCount =
      (!data.status
        ? data.results.reduce((acc, ele) => (acc += ele.status === "fail"), 0) +
          "/"
        : "") + data.results.length;
    failedCount = "-- " + failedCount;
  }
  if (data.levels) {
    var levels =
      "-- (" +
      Object.values(data.levels)
        .map((e, i) => (i > 0 ? "/" + e : e))
        .join("") +
      ")";
  }

  const title = `Validation Point(${num})`;

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
        <RFolder title="Meta Data" data={{ ...data.metaData }} />
        {data.levels && <RFolder title="Levels" data={data.levels} />}
      </Folder>
    </div>
  );
}

export default VPEntry;
