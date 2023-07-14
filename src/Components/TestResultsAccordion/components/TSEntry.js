import React, { useState } from "react";
import Folder from "../../Folder.js";
import MiniTable from "../../MiniTable/MiniTable.js";
import ShowInTable from "../../ShowInTable/ShowInTable.js";
import { formatDuration } from "../../../Utils/utilities.js";
import ShowInMap from "../../ShowInMap/ShowInMap.js";

function TSEntry({ data, num, onClick, active }) {
  const [SATableView, setSATableView] = useState(false);
  const [MPGTableView, setMPGTableView] = useState(false);
  const [mapView, setMapView] = useState(false);

  const design_info = data?.metaData?.design_info;
  const SAConfig = design_info?.dut_instance_info?.sa_configuration;
  const MPGConfig = design_info?.dut_instance_info?.mpg_configuration;

  let SAColumns = [];
  let SAData = [];

  let MPGColumns = [];
  let MPGData = [];

  if (SAConfig) {
    SAColumns = Object.keys(SAConfig[0]);
    SAData = SAConfig.map((e) => Object.values(e));
  }

  if (MPGConfig) {
    MPGColumns = Object.keys(MPGConfig[0]);
    MPGData = MPGConfig.map((e) => Object.values(e));
  }

  const connMap = data?.metaData?.design_info?.dut_connectivity_map;

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
            <span>
              Test Suit {num} --{" "}
              {formatDuration(
                new Date(data.end_date) - new Date(data.creation_date)
              )}
            </span>
          </span>
        }
        onClick={onClick}
        active={active}
        actionElements={
          <ShowInMap
            open={mapView}
            onClose={() => setMapView(false)}
            onClick={() => setMapView(true)}
            maps={{
              "MPG Connectivity Map": connMap?.mpg_connectivity_map,
              "SA Connectivity Map": connMap?.sa_connectivity_map,
            }}
          />
        }
      >
        <Folder title="Meta Data" open>
          <MiniTable
            keys={Object.keys(data.metaData).filter((k) => k !== "design_info")}
            data={data.metaData}
          />
        </Folder>

        {design_info && (
          <Folder title="DUT Info">
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
              {SAConfig &&
                SAConfig.map((e, i) => (
                  <Folder title={`${e.id}`} key={e.id}>
                    <MiniTable keys={Object.keys(e)} data={e} />
                  </Folder>
                ))}
            </Folder>

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
              {MPGConfig &&
                MPGConfig.map((e, i) => (
                  <Folder title={`${e.id}`} key={e.id}>
                    <MiniTable keys={Object.keys(e)} data={e} />
                  </Folder>
                ))}
            </Folder>
          </Folder>
        )}
      </Folder>
    </div>
  );
}

export default TSEntry;
