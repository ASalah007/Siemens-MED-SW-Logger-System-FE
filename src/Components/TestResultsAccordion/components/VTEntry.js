import React from "react";
import Folder from "../../Folder/Folder.js";
import { formatDuration, titlize } from "../../../Utils/utilities.js";
import RFolder from "../../Folder/RFolder.js";

function VTEntry({ data, num, onClick, active }) {
  const duration = formatDuration(
    new Date(data.end_date) - new Date(data.creation_date)
  );

  let title = titlize(data.metaData.name);

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
          <RFolder
            title="Meta Data"
            data={{
              Duration: duration,
              "Failed VPs": data.failedValidationPointsCount,
              "Total VPs":
                data.failedValidationPointsCount +
                data.passedValidationPointsCount,
              ...data.metaData.metaData,
            }}
          />
        )}
      </Folder>
    </div>
  );
}

export default VTEntry;
