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

  const maps = data?.metaData?.connection;

  // add label node to the start of each group
  if (maps) {
    Object.entries(maps).forEach(([map, groups]) => {
      Object.keys(groups).forEach((group) => {
        if (
          maps[map][group].length === 0 ||
          maps[map][group][0].nodeType !== "label"
        )
          maps[map][group].unshift({
            state_id: group,
            name: group + " : ",
            nodeType: "label",
          });
      });
    });
  }

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
              maps={maps}
              onClick={() => setMapView(true)}
              open={mapView}
              onClose={() => setMapView(false)}
              nodesType="v-node"
              grounded
              onNodeClick={nodeClickHandler}
              onNodeDoubleClick={(node) => {
                setTreeView(true);
                setNodeData(node);
              }}
              title="State Machines"
              // onNodeMouseEnter={nodeMouseEnterHandler}
              // onNodeMouseLeave={nodeMouseLeaveHandler}
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
            ...{ ...data.metaData, connection: undefined },
            ...maps,
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

function nodeClickHandler(props) {
  const { node, filteredGroups, edges, setEdges, nodes, setNodes } = props;
  const allNodes = Object.values(filteredGroups).flat();

  // if this node is a slave node then insert an edge to the parent
  const nodeObject = allNodes.find((n) => n.state_id === node.id);
  if (nodeObject.parent_id && nodeObject.parent_id !== "None")
    return childClickHandler({ ...props, allNodes, nodeObject });

  if (node.type !== "parent") return;

  const childsIds = allNodes
    .filter((n) => n.parent_id === node.id)
    .map((n) => n.state_id);

  const testEdges = edges.filter((e) => !e.id.includes(`extra-${node.id}-`));
  if (testEdges.length !== edges.length) {
    setNodes(
      nodes.map((n) => {
        if (childsIds.includes(n.id) && n.type === "child") n.type = n.oldType;
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
    targetHandle: "secondary",
    animated: true,
    style: {
      stroke: "#555555",
      strokeWidth: 1,
      opacity: 0.5,
    },
  }));
  setEdges([...edges, ...newEdges]);

  const newNodes = nodes.map((n) => {
    if (!childsIds.includes(n.id)) return n;
    n.oldType = n.type;
    n.type = "child";
    return n;
  });

  setNodes(newNodes);
}

function childClickHandler({
  node,
  filteredGroups,
  edges,
  setEdges,
  nodes,
  setNodes,
  allNodes,
  nodeObject,
}) {
  const parent = allNodes.find((n) => n.state_id === nodeObject.parent_id);
  const childsIds = allNodes
    .filter((n) => n.parent_id === nodeObject.parent_id)
    .map((n) => n.state_id);

  // if the user clicked on the node or the parent reset edges
  const testEdges = edges.filter((e) => !e.id.includes(`extra-${parent.state_id}-`));
  if (testEdges.length !== edges.length) {
    setEdges(testEdges);
    setNodes(
      nodes.map((n) => {
        if (childsIds.includes(n.id) && n.type === "child") n.type = n.oldType;
        return n;
      })
    );
    return;
  }

  const newEdges = [
    {
      id: `extra-${parent.state_id}-${node.id}`,
      source: "" + parent.state_id,
      target: "" + node.id,
      targetHandle: "secondary",
      animated: true,
      style: {
        stroke: "#555555",
        strokeWidth: 1,
        opacity: 0.5,
      },
    },
  ];
  setEdges([...edges, ...newEdges]);

  const newNodes = nodes.map((n) => {
    if (n.id !== node.id) return n;
    n.oldType = n.type;
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
  if (node.type !== "parent") return;

  // if the user clicked on the node ignore hovering
  const testEdges = edges.filter((e) => !e.id.includes(`extra-${node.id}-`));
  if (testEdges.length !== edges.length) return;

  const allNodes = Object.values(filteredGroups).flat();

  const childsIds = allNodes
    .filter((n) => n.parent_id === node.id)
    .map((n) => n.state_id);

  const newNodes = nodes.map((n) => {
    if (!childsIds.includes(n.id)) return n;

    return { ...n, type: defaultNodeType };
  });

  setNodes(newNodes);
}

export default TCEntry;
