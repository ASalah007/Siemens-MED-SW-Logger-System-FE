import React, { useState } from "react";
import Folder from "../../Folder/Folder.js";
import MiniTable from "../../MiniTable/MiniTable.js";
import ShowInTable from "../../ShowInTable/ShowInTable";
import { ensureArray, formatDuration } from "../../../Utils/utilities.js";
import RFolder from "../../Folder/RFolder.js";
import ShowInMap2 from "../../ShowInMap/ShowInMap2";
import ShowInTree from "../../ShowInTree/ShowInTree.js";

function TCEntry({ data, onClick, active }) {
  const [dutTableView, setDutTableView] = useState(false);
  const [mpgConfigTableView, setMpgConfigTableView] = useState(false);
  const [portConfigTableView, setPortConfigTableView] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [treeView, setTreeView] = useState(false);
  const [nodeData, setNodeData] = useState({});

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
  console.log(data);

  return (
    <div>
      <ShowInTree
        open={treeView}
        onClose={() => setTreeView(false)}
        dialogTitle="Node Properties"
        data={nodeData}
        title={nodeData.name}
      />
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
        actionElements={
          data?.metaData?.connection && (
            <ShowInMap2
              maps={data?.metaData?.connection}
              onClick={() => setMapView(true)}
              open={mapView}
              onClose={() => setMapView(false)}
              nodesType="h-node"
              grounded
              onNodeClick={nodeClickHandler}
              onNodeDoubleClick={(node) => {
                setTreeView(true);
                setNodeData(node);
              }}
              onNodeMouseEnter={nodeMouseEnterHandler}
              onNodeMouseLeave={nodeMouseLeaveHandler}
            />
          )
        }
      >
        <RFolder
          title="Meta Data"
          data={{
            "Failed VTs": data.failedValidationTagsCount,
            "Total VTs":
              data.failedValidationTagsCount + data.passedValidationTagsCount,
            Duration: duration,
            States: data?.metaData?.states,
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

function nodeClickHandler({
  node,
  filteredGroups,
  edges,
  setEdges,
  nodes,
  setNodes,
}) {
  const allNodes = Object.values(filteredGroups).flat();
  if (allNodes.find((n) => n.state_id === node.id)?.nodeType !== "parent")
    return;

  const childsIds = allNodes
    .filter((n) => n.parent_id === node.id)
    .map((n) => n.state_id);

  const testEdges = edges.filter((e) => !e.id.includes(`extra-${node.id}-`));
  if (testEdges.length !== edges.length) {
    setNodes(
      nodes.map((n) => {
        if (childsIds.includes(n.id) && n.type === "child") n.type = "h-node";
        return n;
      })
    );
    setEdges(testEdges);
    return;
  }

  const newEdges = childsIds.map((id) => ({
    id: `extra-${node.id}-${id}`,
    source: "" + node.id,
    target: "" + id,
    targetHandle: "top",
    animated: true,
  }));
  setEdges([...edges, ...newEdges]);

  const newNodes = nodes.map((n) => {
    if (!childsIds.includes(n.id)) return n;
    n.type = "child";
    return n;
  });

  setNodes(newNodes);
}

function nodeMouseEnterHandler(args) {
  nodeMouseLeaveHandler({
    ...args,
    defaultNodeType: "child",
  });
}

function nodeMouseLeaveHandler({
  node,
  filteredGroups,
  nodes,
  setNodes,
  edges,
  setEdges,
  defaultNodeType,
}) {
  const testEdges = edges.filter((e) => !e.id.includes(`extra-${node.id}-`));
  if (testEdges.length !== edges.length) return;

  const allNodes = Object.values(filteredGroups).flat();
  if (allNodes.find((n) => n.state_id === node.id)?.nodeType !== "parent")
    return;

  const childsIds = allNodes
    .filter((n) => n.parent_id === node.id)
    .map((n) => n.state_id);

  const newNodes = nodes.map((n) => {
    if (!childsIds.includes(n.id)) return n;
    n.type = defaultNodeType;
    return n;
  });

  setNodes(newNodes);
}

export default TCEntry;

const maps = {
  "State Machines": {
    "State Machine 1": [
      // {
      //   state_id: "test",
      //   name: "State Machine 1 :",
      //   nodeType: "label",
      // },
      {
        state_id: "1.1",
        connectedTo: "1.2",
        name: "initial",
        port_id: 1,
        parent_id: "None",
        is_parent: false,
        side_effect: "none",
        command: {
          command_handle_name: "None",
          command_arguments: "None",
        },
      },
      {
        state_id: "1.2",
        connectedTo: "1.3",
        name: "reset",
        port_id: 1,
        parent_id: "None",
        is_parent: false,
        side_effect: "local",
        command: {
          command_handle_name: "",
          command_arguments: {
            portId: "1",
          },
        },
      },
      {
        state_id: "1.3",
        connectedTo: "1.4",
        name: "validate",
        port_id: 1,
        parent_id: "2.2",
        is_parent: false,
        nodeType: "passedValidation",
        side_effect: "none",
        command: {
          command_handle_name: "None",
          command_arguments: "None",
        },
        generator_type: "None",
        otn_order: "None",
        prbs_seed: "None",
        value_source: "None",
        fixed_value: "None",
        random_value_seed: "None",
        random_value_min: "None",
        random_value_max: "None",
        value_source_file_type: "None",
        value_source_file_path: "None",
      },
      {
        state_id: "1.4",
        connectedTo: "1.5",
        name: "clear_vars",
        port_id: 1,
        parent_id: "None",
        is_parent: false,
        side_effect: "mandatory",
        command: {
          command_handle_name: "None",
          command_arguments: "None",
        },
      },
      {
        state_id: "1.5",
        connectedTo: "1.5.1",
        name: "reset",
        port_id: 1,
        parent_id: "None",
        nodeType: "parent",
        side_effect: "mandatory",
        command: {
          command_handle_name: "",
          command_arguments: {
            portId: "*",
          },
        },
      },
      {
        state_id: "1.5.1",
        connectedTo: "1.6",
        name: "validate",
        port_id: 1,
        parent_id: "None",
        nodeType: "failedValidation",
        side_effect: "mandatory",
        command: {
          command_handle_name: "",
          command_arguments: {
            portId: "*",
          },
        },
      },
      {
        state_id: "1.6",
        connectedTo: "1.7",
        name: "mux",
        port_id: 1,
        parent_id: "None",
        is_parent: false,
        side_effect: "none",
        command: {
          command_handle_name: "otnMux_handle_40",
          command_arguments: {},
        },
        generator_type: "ODU",
        mux_input: [
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_36",
              command_arguments: {
                fixedValue: "28552",
                generatorType: "ODU",
                valueSource: "FIXED",
                otnOrder: "3",
              },
            },
            generator_type: "ODU",
            otn_order: 3,
            prbs_seed: "None",
            value_source: "FIXED",
            fixed_value: 28552,
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "None",
            value_source_file_path: "None",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_37",
              command_arguments: {
                generatorType: "ODU",
                valueSource: "FILE",
                otnOrder: "3",
              },
            },
            generator_type: "ODU",
            otn_order: 3,
            prbs_seed: "None",
            value_source: "FILE",
            fixed_value: "None",
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "DEFAULT",
            value_source_file_path:
              "/home/ahmela3q/courage/otn/logs/r69/otnGenerator_handle_37_ODU.txt",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_38",
              command_arguments: {
                fixedValue: "36072",
                generatorType: "ODU",
                valueSource: "FIXED",
                otnOrder: "1",
              },
            },
            generator_type: "ODU",
            otn_order: 1,
            prbs_seed: "None",
            value_source: "FIXED",
            fixed_value: 36072,
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "None",
            value_source_file_path: "None",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_39",
              command_arguments: {
                randomValueSeed: "60607",
                randomValueMin: "3648",
                randomValueMax: "25280",
                generatorType: "ODU",
                valueSource: "RANDOM",
                otnOrder: "0",
              },
            },
            generator_type: "ODU",
            otn_order: 0,
            prbs_seed: "None",
            value_source: "RANDOM",
            fixed_value: "None",
            random_value_seed: 60607,
            random_value_min: 3648,
            random_value_max: 25280,
            value_source_file_type: "None",
            value_source_file_path: "None",
          },
        ],
      },
      {
        state_id: "1.7",
        connectedTo: "1.8",
        name: "configure_port",
        port_id: 1,
        parent_id: "None",
        is_parent: false,
        side_effect: "local",
        command: {
          command_handle_name: "",
          command_arguments: {
            portId: "1",
            setInput: "otnMux_handle_40",
            enableFEC: "false",
          },
        },
        port_input_name: "otnMux_handle_40",
        enable_fec: "None",
      },
      {
        state_id: "1.8",
        connectedTo: "1.9",
        name: "start",
        port_id: 1,
        parent_id: "None",
        is_parent: false,
        side_effect: "forced_global",
        command: {
          command_handle_name: "None",
          command_arguments: "None",
        },
        streaming_time: "None",
      },
      {
        state_id: "1.9",
        connectedTo: null,
        name: "end",
        port_id: 1,
        parent_id: "None",
        is_parent: false,
        side_effect: "local",
        command: {
          command_handle_name: "",
          command_arguments: {
            portId: "1",
          },
        },
      },
    ],
    "State Machine 2": [
      // {
      //   state_id: "test2",
      //   name: "State Machine 2 :",
      //   nodeType: "label",
      // },
      {
        state_id: "2.1",
        connectedTo: "2.2",
        name: "initial",
        port_id: 2,
        parent_id: "None",
        is_parent: false,
        side_effect: "none",
        command: {
          command_handle_name: "None",
          command_arguments: "None",
        },
      },
      {
        state_id: "2.2",
        connectedTo: "2.3",
        name: "clear_vars",
        port_id: 2,
        parent_id: "None",
        nodeType: "parent",
        side_effect: "mandatory",
        command: {
          command_handle_name: "",
          command_arguments: {},
        },
      },
      {
        state_id: "2.3",
        connectedTo: "2.4",
        name: "reset",
        port_id: 2,
        parent_id: "1.5",
        is_parent: false,
        side_effect: "mandatory",
        command: {
          command_handle_name: "None",
          command_arguments: "None",
        },
      },
      {
        state_id: "2.4",
        connectedTo: "2.5",
        name: "reset",
        port_id: 2,
        parent_id: "1.5",
        is_parent: false,
        side_effect: "mandatory",
        command: {
          command_handle_name: "None",
          command_arguments: "None",
        },
      },
      {
        state_id: "2.5",
        connectedTo: "2.6",
        name: "mux",
        port_id: 2,
        parent_id: "None",
        is_parent: false,
        side_effect: "none",
        command: {
          command_handle_name: "otnMux_handle_18",
          command_arguments: {},
        },
        generator_type: "OPU",
        mux_input: [
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_1",
              command_arguments: {
                fixedValue: "29609",
                generatorType: "OPU",
                valueSource: "FIXED",
                otnOrder: "1",
              },
            },
            generator_type: "OPU",
            otn_order: 1,
            prbs_seed: "None",
            value_source: "FIXED",
            fixed_value: 29609,
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "None",
            value_source_file_path: "None",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_2",
              command_arguments: {
                valueSourceFilePath:
                  "/home/ahmela3q/courage/otn/logs/r69/random_bytes_0.txt",
                generatorType: "OPU",
                valueSource: "FILE",
                otnOrder: "2",
              },
            },
            generator_type: "OPU",
            otn_order: 2,
            prbs_seed: "None",
            value_source: "FILE",
            fixed_value: "None",
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "RANDOM",
            value_source_file_path:
              "/home/ahmela3q/courage/otn/logs/r69/random_bytes_0.txt",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_3",
              command_arguments: {
                fixedValue: "17730",
                generatorType: "OPU",
                valueSource: "FIXED",
                otnOrder: "0",
              },
            },
            generator_type: "OPU",
            otn_order: 0,
            prbs_seed: "None",
            value_source: "FIXED",
            fixed_value: 17730,
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "None",
            value_source_file_path: "None",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_4",
              command_arguments: {
                fixedValue: "11868",
                generatorType: "OPU",
                valueSource: "FIXED",
                otnOrder: "2",
              },
            },
            generator_type: "OPU",
            otn_order: 2,
            prbs_seed: "None",
            value_source: "FIXED",
            fixed_value: 11868,
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "None",
            value_source_file_path: "None",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_5",
              command_arguments: {
                randomValueSeed: "1251",
                randomValueMin: "50490",
                randomValueMax: "61693",
                generatorType: "OPU",
                valueSource: "RANDOM",
                otnOrder: "2",
              },
            },
            generator_type: "OPU",
            otn_order: 2,
            prbs_seed: "None",
            value_source: "RANDOM",
            fixed_value: "None",
            random_value_seed: 1251,
            random_value_min: 50490,
            random_value_max: 61693,
            value_source_file_type: "None",
            value_source_file_path: "None",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_6",
              command_arguments: {
                fixedValue: "50643",
                generatorType: "OPU",
                valueSource: "FIXED",
                otnOrder: "0",
              },
            },
            generator_type: "OPU",
            otn_order: 0,
            prbs_seed: "None",
            value_source: "FIXED",
            fixed_value: 50643,
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "None",
            value_source_file_path: "None",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_7",
              command_arguments: {
                fixedValue: "15917",
                generatorType: "OPU",
                valueSource: "FIXED",
                otnOrder: "1",
              },
            },
            generator_type: "OPU",
            otn_order: 1,
            prbs_seed: "None",
            value_source: "FIXED",
            fixed_value: 15917,
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "None",
            value_source_file_path: "None",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_8",
              command_arguments: {
                valueSourceFilePath:
                  "/home/ahmela3q/courage/otn/logs/r69/random_bytes_1.txt",
                generatorType: "OPU",
                valueSource: "FILE",
                otnOrder: "0",
              },
            },
            generator_type: "OPU",
            otn_order: 0,
            prbs_seed: "None",
            value_source: "FILE",
            fixed_value: "None",
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "RANDOM",
            value_source_file_path:
              "/home/ahmela3q/courage/otn/logs/r69/random_bytes_1.txt",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_9",
              command_arguments: {
                fixedValue: "38138",
                generatorType: "OPU",
                valueSource: "FIXED",
                otnOrder: "1",
              },
            },
            generator_type: "OPU",
            otn_order: 1,
            prbs_seed: "None",
            value_source: "FIXED",
            fixed_value: 38138,
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "None",
            value_source_file_path: "None",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_10",
              command_arguments: {
                fixedValue: "2964",
                generatorType: "OPU",
                valueSource: "FIXED",
                otnOrder: "0",
              },
            },
            generator_type: "OPU",
            otn_order: 0,
            prbs_seed: "None",
            value_source: "FIXED",
            fixed_value: 2964,
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "None",
            value_source_file_path: "None",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_11",
              command_arguments: {
                randomValueSeed: "38039",
                randomValueMin: "14552",
                randomValueMax: "33075",
                generatorType: "OPU",
                valueSource: "RANDOM",
                otnOrder: "1",
              },
            },
            generator_type: "OPU",
            otn_order: 1,
            prbs_seed: "None",
            value_source: "RANDOM",
            fixed_value: "None",
            random_value_seed: 38039,
            random_value_min: 14552,
            random_value_max: 33075,
            value_source_file_type: "None",
            value_source_file_path: "None",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_12",
              command_arguments: {
                generatorType: "OPU",
                valueSource: "FILE",
                otnOrder: "1",
              },
            },
            generator_type: "OPU",
            otn_order: 1,
            prbs_seed: "None",
            value_source: "FILE",
            fixed_value: "None",
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "DEFAULT",
            value_source_file_path:
              "/home/ahmela3q/courage/otn/logs/r69/otnGenerator_handle_12_OPU.txt",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_13",
              command_arguments: {
                valueSourceFilePath:
                  "/home/ahmela3q/courage/otn/logs/r69/random_bytes_2.txt",
                generatorType: "OPU",
                valueSource: "FILE",
                otnOrder: "1",
              },
            },
            generator_type: "OPU",
            otn_order: 1,
            prbs_seed: "None",
            value_source: "FILE",
            fixed_value: "None",
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "RANDOM",
            value_source_file_path:
              "/home/ahmela3q/courage/otn/logs/r69/random_bytes_2.txt",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_14",
              command_arguments: {
                randomValueSeed: "18746",
                randomValueMin: "27444",
                randomValueMax: "38031",
                generatorType: "OPU",
                valueSource: "RANDOM",
                otnOrder: "0",
              },
            },
            generator_type: "OPU",
            otn_order: 0,
            prbs_seed: "None",
            value_source: "RANDOM",
            fixed_value: "None",
            random_value_seed: 18746,
            random_value_min: 27444,
            random_value_max: 38031,
            value_source_file_type: "None",
            value_source_file_path: "None",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_15",
              command_arguments: {
                generatorType: "OPU",
                valueSource: "FILE",
                otnOrder: "1",
              },
            },
            generator_type: "OPU",
            otn_order: 1,
            prbs_seed: "None",
            value_source: "FILE",
            fixed_value: "None",
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "DEFAULT",
            value_source_file_path:
              "/home/ahmela3q/courage/otn/logs/r69/otnGenerator_handle_15_OPU.txt",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_16",
              command_arguments: {
                valueSourceFilePath:
                  "/home/ahmela3q/courage/otn/logs/r69/random_bytes_3.txt",
                generatorType: "OPU",
                valueSource: "FILE",
                otnOrder: "0",
              },
            },
            generator_type: "OPU",
            otn_order: 0,
            prbs_seed: "None",
            value_source: "FILE",
            fixed_value: "None",
            random_value_seed: "None",
            random_value_min: "None",
            random_value_max: "None",
            value_source_file_type: "RANDOM",
            value_source_file_path:
              "/home/ahmela3q/courage/otn/logs/r69/random_bytes_3.txt",
          },
          {
            state_id: "None",
            name: "None",
            port_id: "None",
            parent_id: "None",
            is_parent: false,
            side_effect: "None",
            command: {
              command_handle_name: "otnGenerator_handle_17",
              command_arguments: {
                randomValueSeed: "14793",
                randomValueMin: "21852",
                randomValueMax: "62380",
                generatorType: "OPU",
                valueSource: "RANDOM",
                otnOrder: "3",
              },
            },
            generator_type: "OPU",
            otn_order: 3,
            prbs_seed: "None",
            value_source: "RANDOM",
            fixed_value: "None",
            random_value_seed: 14793,
            random_value_min: 21852,
            random_value_max: 62380,
            value_source_file_type: "None",
            value_source_file_path: "None",
          },
        ],
      },
      {
        state_id: "2.6",
        connectedTo: "2.7",
        name: "configure_port",
        port_id: 2,
        parent_id: "None",
        is_parent: false,
        side_effect: "local",
        command: {
          command_handle_name: "",
          command_arguments: {
            portId: "2",
            setInput: "otnMux_handle_18",
            enableFEC: "true",
          },
        },
        port_input_name: "otnMux_handle_18",
        enable_fec: "None",
      },
      {
        state_id: "2.7",
        connectedTo: "2.8",
        name: "start",
        port_id: 2,
        parent_id: "None",
        is_parent: true,
        side_effect: "global",
        command: {
          command_handle_name: "",
          command_arguments: {
            portId: "*",
          },
        },
        streaming_time: 5,
      },
      {
        state_id: "2.8",
        connectedTo: "2.9",
        name: "stop",
        port_id: 2,
        parent_id: "None",
        is_parent: false,
        side_effect: "local",
        command: {
          command_handle_name: "None",
          command_arguments: "None",
        },
      },
      {
        state_id: "2.9",
        connectedTo: "2.10",
        name: "end",
        port_id: 2,
        parent_id: "None",
        is_parent: false,
        side_effect: "local",
        command: {
          command_handle_name: "",
          command_arguments: {
            portId: "2",
          },
        },
      },
    ],
  },
};
