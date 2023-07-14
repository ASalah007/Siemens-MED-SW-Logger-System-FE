import React from "react";
import Folder from "../../Folder.js";
import MiniTable from "../../MiniTable/MiniTable.js";

function VTEntry({ data, num, onClick, active }) {
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
            {data.metaData.name}
          </span>
        }
        active={active}
        onClick={onClick}
      >
        {data?.metaData?.metaData && (
          <Folder title="Meta Data">
            <MiniTable
              keys={Object.keys(data.metaData.metaData)}
              data={data.metaData.metaData}
            />
          </Folder>
        )}
      </Folder>
    </div>
  );
}

export default VTEntry;
