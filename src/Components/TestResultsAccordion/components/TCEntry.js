import React, { useState } from "react";
import Folder from "../../Folder.js";
import MiniTable from "../../MiniTable/MiniTable.js";
import ShowInTable from "../../ShowInTable/ShowInTable";
import { formatDuration } from "../../../Utils/utilities.js";

function TCEntry({ data, num, onClick, active }) {
  console.log(data);
  const [dutTableView, setDutTableView] = useState(false);
  const [macsConfigTableView, setMacsConfigTableView] = useState(false);
  const [macsInfoTableView, setMacsInfoTableView] = useState(false);
  const [mpgConfigTableView, setMpgConfigTableView] = useState(false);
  const [portConfigTableView, setPortConfigTableView] = useState(false);

  const dutColumns = ["master_id", "slave_ids"];
  const dutData = data.metaData.dut_master_slave_info.map((ele) => [
    ele?.master_id,
    ele?.slave_ids && ele.slave_ids.join(", "),
  ]);

  const macsConfig = data?.metaData?.macs_configuration;
  const mpgConfig = data?.metaData?.mpg_configuration;

  let macsColumns = [];
  let macsData = [];

  if (macsConfig) {
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
  let mpgColumns = ["Id", "FEC Enable"];
  let mpgData = [];

  console.log(data);
  if (mpgConfig) {
    mpgData = Object.entries(mpgConfig).map(([id, value]) => [
      id,
      value?.fec_configuration?.Enable,
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
        {data?.metaData?.dut_master_slave_info && (
          <Folder
            noArrow
            title="DUT Master Slave Info"
            onClick={() => setDutTableView(true)}
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
          ></Folder>
        )}

        {data?.metaData?.macs_info && (
          <Folder
            noArrow
            title="Macs Info"
            onClick={() => setMacsInfoTableView(true)}
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
          ></Folder>
        )}

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

        {mpgConfig && (
          <Folder
            title="MPG Config"
            actionElements={
              <ShowInTable
                onClick={() => setMpgConfigTableView(true)}
                open={mpgConfigTableView}
                onClose={() => setMpgConfigTableView(false)}
                title="Mpg Config"
                columns={mpgColumns}
                data={mpgData}
              />
            }
          >
            {Object.entries(mpgConfig).map(([k, v]) => (
              <Folder title={k}>
                <Folder title="FEC Config">
                  <MiniTable
                    keys={Object.keys(v.fec_configuration)}
                    data={v.fec_configuration}
                  />
                </Folder>

                <Folder
                  title="Ports Config"
                  actionElements={
                    <ShowInTable
                      onClick={() => setPortConfigTableView(true)}
                      open={portConfigTableView}
                      onClose={() => setPortConfigTableView(false)}
                      title="Ports Config"
                      columns={["Id", ...Object.keys(v.ports_configuration[0])]}
                      data={Object.entries(v.ports_configuration).map(
                        ([k, v]) => [k, ...Object.values(v)]
                      )}
                    />
                  }
                >
                  {v.ports_configuration.map((b, i) => (
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
