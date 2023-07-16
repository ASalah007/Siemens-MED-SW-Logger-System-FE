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

  const macsConfig = data?.metaData?.macs_configuration;
  const mpgConfig = data?.metaData?.mpg_configuration;

  let macsColumns = [];
  let macsData = [];
  if (macsConfig && macsConfig.length > 0) {
    macsColumns = [
      "id",
      ...Object.values(Object.values(Object.values(macsConfig))[0]).flatMap(
        (o) => Object.keys(o)
      ),
    ];

    macsData = Object.entries(macsConfig).map(([key, value]) => [
      key,
      ...Object.values(value).flatMap((e) => Object.values(e)),
    ]);
  }

  const macsInfoColumns = ["id", "mii_type"];
  const macsInfoData = data.metaData.macs_info.map((e) => Object.values(e));

  const failedCount =
    (!data.status ? `${data.failedValidationTagsCount}/` : "") +
    data.ValidationTagsCount;
  const duration = formatDuration(
    new Date(data.end_date) - new Date(data.creation_date)
  );

  const title = `TC ${num} -- ${failedCount} -- ${duration} `;

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

        {macsConfig && (
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
            {Object.keys(macsConfig).map((k) => (
              <Folder title={`${k}`}>
                {Object.keys(macsConfig[k]).map((e) => (
                  <Folder title={e}>
                    <MiniTable
                      keys={Object.keys(macsConfig[k][e])}
                      data={macsConfig[k][e]}
                    />
                  </Folder>
                ))}
              </Folder>
            ))}
          </Folder>
        )}

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

        {mpgConfig && (
          <Folder title="MPG Config">
            {Object.keys(mpgConfig).map((e) => (
              <Folder title={e}>
                <Folder title="FEC Config">
                  <MiniTable
                    keys={Object.keys(mpgConfig[e].fec_configuration)}
                    data={mpgConfig[e].fec_configuration}
                  />
                </Folder>

                <Folder title="Ports Config">
                  {mpgConfig[e].ports_configuration.map((b, i) => (
                    <Folder title={i}>
                      <MiniTable keys={Object.keys(b)} data={b} />
                    </Folder>
                  ))}
                </Folder>
              </Folder>
            ))}
          </Folder>
        )}
      </Folder>
    </div>
  );
}

export default TCEntry;
