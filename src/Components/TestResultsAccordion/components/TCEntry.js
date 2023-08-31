import React, { useState } from "react";
import Folder from "../../Folder/Folder.js";
import MiniTable from "../../MiniTable/MiniTable.js";
import ShowInTable from "../../ShowInTable/ShowInTable";
import { ensureArray, formatDuration } from "../../../Utils/utilities.js";
import RFolder from "../../Folder/RFolder.js";

function TCEntry({ data, num, onClick, active }) {
  const [dutTableView, setDutTableView] = useState(false);
  const [mpgConfigTableView, setMpgConfigTableView] = useState(false);
  const [portConfigTableView, setPortConfigTableView] = useState(false);

  const dutColumns = ["master_id", "slave_ids"];
  let masterSlaveInfo = data?.metaData?.dut_master_slave_info;

  let dutData = [[]];
  if (masterSlaveInfo) {
    masterSlaveInfo = ensureArray(masterSlaveInfo);
    dutData = masterSlaveInfo.map((ele) => [
      ele?.master_id,
      ele?.slave_ids && ele.slave_ids.join(", "),
    ]);
  }

  const macsConfig = data?.metaData?.macs_configuration;
  const mpgConfig = data?.metaData?.mpg_configuration;

  let mpgColumns = ["Id", "FEC Enable"];
  let mpgData = [];

  if (mpgConfig) {
    mpgData = Object.entries(mpgConfig).map(([id, value]) => [
      id,
      value?.fec_configuration?.Enable,
    ]);
  }

  const macsInfo = data?.metaData?.macs_info;

  const duration = formatDuration(
    new Date(data.end_date) - new Date(data.creation_date)
  );

  let title = `Test Case(${data.incrementalId})`;

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
        <RFolder
          title="Meta Data"
          data={{
            "Failed VTs": data.failedValidationTagsCount,
            "Total VTs":
              data.failedValidationTagsCount + data.passedValidationTagsCount,
            Duration: duration,
          }}
        />

        {macsInfo && (
          <RFolder
            title="Macs Info"
            tablesEntries={["Macs Info"]}
            data={macsInfo}
          />
        )}

        {macsConfig && <RFolder title="Macs Config" data={macsConfig} />}

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
                <RFolder title="FEC Config" data={v.fec_configuration} />

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

        {masterSlaveInfo && (
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
      </Folder>
    </div>
  );
}

export default TCEntry;
