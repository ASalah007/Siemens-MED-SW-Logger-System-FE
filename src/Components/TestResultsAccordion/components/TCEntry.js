import React, { useState } from "react";
import Folder from "../../Folder.js";
import MiniTable from "../../MiniTable/MiniTable.js";
import ShowInTable from "../../ShowInTable/ShowInTable";
import { formatDuration } from "../../../Utils/utilities.js";

function TCEntry({ data, num, onClick, active }) {
  const [dutTableView, setDutTableView] = useState(false);
  const [macsConfigTableView, setMacsConfigTableView] = useState(false);
  const [macsInfoTableView, setMacsInfoTableView] = useState(false);

  const dutColumns = ["master_id", "slave_ids"];
  const dutData = data.metaData.dut_master_slave_info.map((ele) => [
    ele.master_id,
    ele.slave_ids.join(", "),
  ]);

  const macsColumns = [
    "id",
    ...Object.values(
      Object.values(Object.values(data.metaData.macs_configuration))[0]
    ).flatMap((o) => Object.keys(o)),
  ];

  const macsData = Object.entries(data.metaData.macs_configuration).map(
    ([key, value]) => [
      key,
      ...Object.values(value).flatMap((e) => Object.values(e)),
    ]
  );

  const macsInfoColumns = ["id", "mii_type"];
  const macsInfoData = data.metaData.macs_info.map((e) => Object.values(e));

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
            Test Case {num} --{" "}
            {formatDuration(
              new Date(data.end_date) - new Date(data.creation_date)
            )}
          </span>
        }
        active={active}
        onClick={onClick}
      >
        <Folder
          title="DUT Master Slave Info"
          actionElements={
            <ShowInTable
              onClick={() => setDutTableView(true)}
              open={dutTableView}
              onClose={() => setDutTableView(false)}
              title="DUT Master Slave Info"
              columns={dutColumns}
              data={dutData}
            />
          }
        >
          {data.metaData.dut_master_slave_info.map((e, i) => (
            <Folder title={`${i}`} key={e.id}>
              <MiniTable keys={Object.keys(e)} data={e} />
            </Folder>
          ))}
        </Folder>

        <Folder
          title="Macs Config"
          actionElements={
            <ShowInTable
              onClick={() => setMacsConfigTableView(true)}
              open={macsConfigTableView}
              onClose={() => setMacsConfigTableView(false)}
              title="Macs Configuration"
              columns={macsColumns}
              data={macsData}
            />
          }
        >
          {Object.keys(data.metaData.macs_configuration).map((k) => (
            <Folder title={`${k}`}>
              {Object.keys(data.metaData.macs_configuration[k]).map((e) => (
                <Folder title={e}>
                  <MiniTable
                    keys={Object.keys(data.metaData.macs_configuration[k][e])}
                    data={data.metaData.macs_configuration[k][e]}
                  />
                </Folder>
              ))}
            </Folder>
          ))}
        </Folder>

        <Folder
          title="Macs Info"
          actionElements={
            <ShowInTable
              onClick={() => setMacsInfoTableView(true)}
              open={macsInfoTableView}
              onClose={() => setMacsInfoTableView(false)}
              title="Macs Informations"
              columns={macsInfoColumns}
              data={macsInfoData}
            />
          }
        >
          {data.metaData.macs_info.map((e) => (
            <Folder title={e.id}>
              <MiniTable keys={Object.keys(e)} data={e} />
            </Folder>
          ))}
        </Folder>

        <Folder title="MPG Config">
          {Object.keys(data.metaData.mpg_configuration).map((e) => (
            <Folder title={e}>
              <Folder title="FEC Config">
                <MiniTable
                  keys={Object.keys(
                    data.metaData.mpg_configuration[e].fec_configuration
                  )}
                  data={data.metaData.mpg_configuration[e].fec_configuration}
                />
              </Folder>

              <Folder title="Ports Config">
                {data.metaData.mpg_configuration[e].ports_configuration.map(
                  (b, i) => (
                    <Folder title={i}>
                      <MiniTable keys={Object.keys(b)} data={b} />
                    </Folder>
                  )
                )}
              </Folder>
            </Folder>
          ))}
        </Folder>
      </Folder>
    </div>
  );
}

export default TCEntry;
