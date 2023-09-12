import React, { useState } from "react";
import RFolder from "../../Folder/RFolder.js";
import { formatDuration } from "../../../Utils/utilities.js";
import ShowInMap from "../../ShowInMap/ShowInMap.js";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog.js";
import { IconButton, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteTestSuite } from "../../../Services/authServices.js";
import UserContext from "../../../Contexts/UserContext.js";

function TSEntry({ data, onClick, active, onDelete }) {
  const [mapView, setMapView] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  const user = React.useContext(UserContext);

  const deleteAllowed =
    user?.deletableDatabases?.includes(connectedDatabase) || user.isAdmin;

  const connMap = data?.metaData?.design_info?.dut_connectivity_map;
  const dutMap = {};
  // dutMap.mpg_connectivity_map = { 1: "2", 2: "3", 3: "4", 4: "1" };
  console.log(dutMap);
  if (connMap?.mpg_connectivity_map)
    dutMap["MPG Connectivity Map"] = connMap.mpg_connectivity_map;

  if (connMap?.sa_connectivity_map)
    dutMap["SA Connectivity Map"] = connMap.sa_connectivity_map;

  const testCasesCount = data.failedTestCasesCount + data.passedTestCasesCount;

  const duration = formatDuration(
    new Date(data.end_date) - new Date(data.creation_date)
  );

  let title = `Test Suite(${data.incrementalId})`;

  const testSuite = {
    ...data.metaData,
    "Total TCs": testCasesCount,
    "Failed TCs": data.failedTestCasesCount,
    Duration: duration,
  };

  return (
    <div className="">
      <RFolder
        title={
          <span
            className={
              "font-bold text-lg " +
              (data.status ? "text-success" : "text-fail")
            }
          >
            <span>{title}</span>
          </span>
        }
        onClick={onClick}
        active={active}
        actionElements={
          <div className="flex items-center justify-end">
            <ShowInMap
              open={mapView}
              onClose={() => setMapView(false)}
              onClick={() => setMapView(true)}
              maps={dutMap}
            />
            <div className="flex items-center justify-end">
              {deleteAllowed && (
                <Tooltip
                  title="Delete this TestSuite"
                  placement="bottom"
                  disableInteractive
                >
                  <IconButton
                    onClick={() => {
                      setOpenConfirmation(true);
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}

              <ConfirmationDialog
                open={openConfirmation}
                onClose={() => setOpenConfirmation(false)}
                content="Please note that data can NOT be retreived after deletion !!"
                onConfirm={() => {
                  deleteTestSuite(data._id).then((res) => {
                    onDelete({ id: data._id, res });
                  });
                }}
              />
            </div>
          </div>
        }
        data={testSuite}
        tablesEntries={["sa_configuration", "mpg_configuration"]}
      />
    </div>
  );
}
export default TSEntry;
