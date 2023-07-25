import React from "react";
import Folder from "../../Folder.js";
import MiniTable from "../../MiniTable/MiniTable.js";
import { formatDuration } from "../../../Utils/utilities.js";

function VTEntry({ data, num, onClick, active }) {
  const failedCount =
    (!data.status ? data.failedValidationPointsCount + "/" : "") +
    data.ValidationPointsCount;

  const duration = formatDuration(
    new Date(data.end_date) - new Date(data.creation_date)
  );

  let title = `${data.metaData.name} `;
  if (data.ValidationPointsCount) title += `-- ${failedCount}`;
  if (duration) title += `-- ${duration} `;

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
