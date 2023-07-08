import React, { useState } from "react";
import Folder from "../../Folder.js";
import MiniTable from "../../MiniTable.js";
import ShowInTable from "../../ShowInTable/ShowInTable.js";

function VPEntry({ data, num, onClick, active }) {
  const [resultsTableView, setResultsTableView] = useState(false);
  let resultsColumns = [];
  let resultsData = [];

  if (data.results) {
    resultsColumns = Object.keys(data.results[0]);
    resultsData = data.results.map((e) => Object.values(e));
  }
  console.log(data);

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
            Validation Point {num} -- ({data.levels.mac},{" "}
            {data.levels.direction})
          </span>
        }
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
