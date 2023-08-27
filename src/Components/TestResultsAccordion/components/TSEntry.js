import React, { useState } from "react";
import Folder from "../../Folder/Folder.js";
import MiniTable from "../../MiniTable/MiniTable.js";
import ShowInTable from "../../ShowInTable/ShowInTable.js";
import { formatDuration } from "../../../Utils/utilities.js";
import ShowInMap from "../../ShowInMap/ShowInMap.js";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog.js";
import { IconButton, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteTestSuite } from "../../../Services/authServices.js";
import UserContext from "../../../Contexts/UserContext.js";

function TSEntry({ data, num, onClick, active, onDelete }) {
  const [SATableView, setSATableView] = useState(false);
  const [MPGTableView, setMPGTableView] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  const user = React.useContext(UserContext);

  const deleteAllowed =
    user?.deletableDatabases?.includes(connectedDatabase) || user.isAdmin;

  const design_info = data?.metaData?.design_info;
  const SAConfig = design_info?.dut_instance_info?.sa_configuration;
  const MPGConfig = design_info?.dut_instance_info?.mpg_configuration;

  let SAColumns = [];
  let SAData = [];

  let MPGColumns = [];
  let MPGData = [];

  if (SAConfig && SAConfig.length > 0) {
    SAColumns = Object.keys(SAConfig[0]);
    SAData = SAConfig.map((e) => Object.values(e));
  }

  if (MPGConfig && MPGConfig.length > 0) {
    MPGColumns = Object.keys(MPGConfig[0]);
    MPGData = MPGConfig.map((e) => Object.values(e));
  }

  const connMap = data?.metaData?.design_info?.dut_connectivity_map;
  const dutMap = {};
  if (connMap?.mpg_connectivity_map)
    dutMap["MPG Connectivity Map"] = connMap.mpg_connectivity_map;

  if (connMap?.sa_connectivity_map)
    dutMap["SA Connectivity Map"] = connMap.sa_connectivity_map;

  const testCasesCount = data.failedTestCasesCount + data.passedTestCasesCount;

  const duration = formatDuration(
    new Date(data.end_date) - new Date(data.creation_date)
  );

  let title = `Test Suite(${data.incrementalId})`;

  return (
    <div className="">
      <Folder
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
      >
        <Folder title="Meta Data" open>
          <MiniTable
            keys={[
              ...Object.keys(data.metaData).filter((k) => k !== "design_info"),
              "Duration",
              "Failed TCs",
              "Total TCs",
            ]}
            data={{
              ...data.metaData,
              "Total TCs": testCasesCount,
              "Failed TCs": data.failedTestCasesCount,
              Duration: duration,
            }}
          />
        </Folder>

        {design_info && (
          <Folder title="DUT Info">
            {SAConfig && SAConfig.length > 0 && (
              <Folder
                title="SA Config"
                actionElements={
                  <ShowInTable
                    onClick={() => setSATableView(true)}
                    open={SATableView}
                    onClose={() => setSATableView(false)}
                    title="SA Configs"
                    columns={SAColumns}
                    data={SAData}
                  />
                }
              >
                {SAConfig.map((e, i) => (
                  <Folder title={`${e.id}`} key={e.id}>
                    <MiniTable keys={Object.keys(e)} data={e} />
                  </Folder>
                ))}
              </Folder>
            )}

            {MPGConfig && MPGConfig.length > 0 && (
              <Folder
                title="MPG Config"
                actionElements={
                  <ShowInTable
                    onClick={() => setMPGTableView(true)}
                    open={MPGTableView}
                    onClose={() => setMPGTableView(false)}
                    title="MPG Configs"
                    columns={MPGColumns}
                    data={MPGData}
                  />
                }
              >
                {MPGConfig.map((e, i) => (
                  <Folder title={`${e.id}`} key={e.id}>
                    <MiniTable keys={Object.keys(e)} data={e} />
                  </Folder>
                ))}
              </Folder>
            )}
          </Folder>
        )}
      </Folder>
    </div>
  );
}
export default TSEntry;
