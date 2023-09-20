import React, { useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import edgeTypes from "../../Utils/FlowTypes/EdgeTypes.js";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  useOnSelectionChange,
} from "reactflow";
import "reactflow/dist/style.css";
import Folder from "../Folder/Folder";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MapDialog({ open, onClose, maps }) {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    activeMap,
    folderHandler,
    checkBoxHandler,
    connectedComponents,
    activeComponents,
  } = useMapDialogStates({ maps });

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
              Connectivity Map
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
            {Object.entries(maps).map(([k, v], i) => (
              <Folder
                title={k}
                active={activeMap === i}
                onClick={() => folderHandler(i)}
                key={k}
              >
                <FormGroup>
                  {connectedComponents[i].map((c, j) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={activeComponents[i][j]}
                          onChange={() => checkBoxHandler(i, j)}
                        />
                      }
                      label={`Group ${j + 1}`}
                      key={`Group ${j + 1}`}
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
              fitView
            >
              <Controls />
              <MiniMap nodeColor="#6ede87" zoomable pannable />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

function useMapDialogStates({ maps }) {
  const [activeMap, setActiveMap] = useState(0);
  const connectedComponents = useMemo(
    () => Object.values(maps).map((graph) => getConnectedComponents(graph)),
    [maps]
  );

  const [activeComponents, setActiveComponents] = useState(
    Array.from(connectedComponents, (row) => new Array(row.length).fill(true))
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(
    getNodes(connectedComponents[activeMap])
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    getEdges(Object.values(maps)[activeMap])
  );

  const checkBoxHandler = (i, j) => {
    const newActiveComponents = activeComponents.map((row) => [...row]);
    newActiveComponents[i][j] = !activeComponents[i][j];
    setActiveComponents(newActiveComponents);
    const newNodes = getNodes(
      connectedComponents[i].filter((e, k) => newActiveComponents[i][k])
    );

    if (activeMap === i) {
      setNodes(newNodes);
      setEdges(getEdges(Object.values(maps)[i]));
    }
  };

  const folderHandler = (i) => {
    setActiveMap(i);
    const newNodes = getNodes(
      connectedComponents[i].filter((e, k) => activeComponents[i][k])
    );
    setNodes(newNodes);
    setEdges(getEdges(Object.values(maps)[i]));
  };

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      setEdges((old) => {
        const nw = [...old];
        nw.map((e) => {
          const edgeAffected =
            nodes.length > 0 &&
            (e.source === nodes[0].id || e.target === nodes[0].id);

          e.animated = edgeAffected;
          e.type = edgeAffected && "start-end";

          return e;
        });
        return nw;
      });
    },
  });

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    activeMap,
    folderHandler,
    checkBoxHandler,
    connectedComponents,
    activeComponents,
  };
}

function getConnectedComponents(graph) {
  const visited = new Set();
  const components = [];

  for (let node in graph) {
    if (!visited.has(node)) {
      const component = [];
      dfs(node, component);
      components.push(component);
    }
  }
  return components;

  function dfs(node, component) {
    if (visited.has(node)) return;
    visited.add(node);
    component.push(node);

    const neighbor = graph[node];
    dfs(neighbor, component);
  }
}

function getNodes(connectedComponents) {
  const nodes = [];

  const style = {
    borderRadius: "10px",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  let currentX = 10;
  let currentY = 30;
  const componentSpacing = 120;
  const nodeSpacing = 60;

  const MAX_NODES_PER_ROW = 14;
  let nodesInRow = 0;

  for (let i = 0; i < connectedComponents.length; i++) {
    const component = connectedComponents[i];
    const componentSize = component.length;

    for (let j = 0; j < componentSize; j++) {
      const nodeId = component[j];
      const node = {
        id: nodeId,
        position: { x: currentX, y: currentY },
        data: { label: nodeId },
        style,
        connectable: false,
      };
      nodes.push(node);

      currentX += nodeSpacing;
      nodesInRow++;
    }
    currentX += 30;

    if (
      i < connectedComponents.length - 1 &&
      connectedComponents[i + 1].length + nodesInRow > MAX_NODES_PER_ROW
    ) {
      currentY += componentSpacing;
      currentX = 10;
      nodesInRow = 0;
    }
  }

  return nodes;
}

function getEdges(graph) {
  if (!graph) return [];
  const edges = Object.entries(graph).map(([target, source]) => ({
    id: `e${source}-${target}`,
    source,
    target,
  }));

  return edges;
}
