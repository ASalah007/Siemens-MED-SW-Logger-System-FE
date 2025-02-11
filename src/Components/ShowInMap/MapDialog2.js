import React, { useCallback, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import edgeTypes from "../../Utils/FlowTypes/EdgeTypes.js";
import nodeTypes from "../../Utils/FlowTypes/NodeTypes.js";

import ReactFlow, { Controls, useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";
import Folder from "../Folder/Folder";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import {
  getEdgesFromMap,
  getNodesFromMap,
} from "../../Utils/FlowTypes/utilities.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MapDialog2(props) {
  const { open, onClose, maps, title } = props;
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    activeMap,
    folderHandler,
    checkBoxHandler,
    activeGroups,
    nodeClickHandler,
    nodeDoubleClickHandler,
    nodeMouseEnterHandler,
    nodeMouseLeaveHandler,
  } = useMapDialogStates(props);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={() => onClose()}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title || "Maps"}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => onClose()}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="w-full h-full flex">
          <div className="w-60 border-r shadow">
            {Object.entries(maps).map(([map, groups], i) => (
              <Folder
                key={map}
                title={map}
                active={activeMap === map}
                onClick={() => folderHandler(map)}
              >
                <FormGroup>
                  {Object.keys(groups).map((group) => (
                    <FormControlLabel
                      key={map + "" + group}
                      control={
                        <Checkbox
                          checked={activeGroups[map][group]}
                          onChange={() => checkBoxHandler(map, group)}
                        />
                      }
                      label={group}
                    />
                  ))}
                </FormGroup>
              </Folder>
            ))}
          </div>

          <div className="grow">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              edgeTypes={edgeTypes}
              nodeTypes={nodeTypes}
              onNodeClick={nodeClickHandler}
              onNodeDoubleClick={nodeDoubleClickHandler}
              zoomOnDoubleClick={false}
              zoomOnScroll={false}
              // onNodeMouseEnter={nodeMouseEnterHandler}
              // onNodeMouseLeave={nodeMouseLeaveHandler}
              panOnScroll={true}
              onlyRenderVisibleElements
            >
              <Controls />
              {/* <MiniMap nodeColor="#6ede87" zoomable pannable /> */}
              {/* <Background variant="dots" gap={12} size={1} /> */}
            </ReactFlow>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

function useMapDialogStates({
  maps,
  grounded,
  nodesType,
  onNodeClick,
  onNodeDoubleClick,
  onNodeMouseEnter,
  onNodeMouseLeave,
}) {
  const [activeMap, setActiveMap] = useState(Object.keys(maps)[0]);

  const [activeGroups, setActiveGroups] = useState(
    getDefaultActiveGroups(maps)
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(
    getNodesFromMap(maps[activeMap], nodesType, grounded)
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    getEdgesFromMap(maps[activeMap])
  );

  const filteredGroups = useCallback(() => {
    return Object.entries(maps[activeMap]).reduce((acc, [group, nodes]) => {
      if (activeGroups[activeMap][group]) acc[group] = nodes;
      return acc;
    }, {});
  }, [activeGroups, activeMap, maps]);

  useEffect(() => {
    setNodes(getNodesFromMap(filteredGroups(), nodesType, grounded));
    setEdges(getEdgesFromMap(maps[activeMap]));
  }, [
    activeMap,
    filteredGroups,
    grounded,
    maps,
    nodesType,
    setEdges,
    setNodes,
  ]);

  const checkBoxHandler = (map, group) => {
    const newGroups = structuredClone(activeGroups);
    newGroups[map][group] = !activeGroups[map][group];
    setActiveGroups(newGroups);
  };

  const folderHandler = (map) => setActiveMap(map);
  const nodeClickHandler = useCallback(
    (e, node) =>
      onNodeClick({
        node,
        filteredGroups: filteredGroups(),
        edges,
        setEdges,
        nodes,
        setNodes,
      }),
    [edges, nodes, onNodeClick]
  );

  const nodeDoubleClickHandler = useCallback(
    (e, node) => {
      const n = Object.values(filteredGroups())
        .flat()
        .find((n) => n.state_id === node.id);
      onNodeDoubleClick(n);
    },
    [onNodeDoubleClick]
  );

  const nodeMouseEnterHandler = useCallback((e, node) => {
    onNodeMouseEnter({
      node,
      filteredGroups: filteredGroups(),
      nodes,
      setNodes,
      edges,
      setEdges,
      defaultNodeType: nodesType,
    });
  }, []);

  const nodeMouseLeaveHandler = useCallback(
    (e, node) => {
      onNodeMouseLeave({
        node,
        filteredGroups: filteredGroups(),
        nodes,
        setNodes,
        edges,
        setEdges,
        defaultNodeType: nodesType,
      });
    },
    [edges, nodes, nodesType]
  );

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    activeMap,
    folderHandler,
    checkBoxHandler,
    activeGroups,
    nodeClickHandler,
    nodeDoubleClickHandler,
    nodeMouseEnterHandler,
    nodeMouseLeaveHandler,
  };
}

function getDefaultActiveGroups(maps) {
  return Object.entries(maps).reduce((acc, [map, groups]) => {
    acc[map] = {};
    Object.keys(groups).forEach((group) => {
      acc[map][group] = true;
    });
    return acc;
  }, {});
}
