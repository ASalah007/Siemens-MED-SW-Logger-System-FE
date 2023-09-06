import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import { ReactFlowProvider } from "reactflow";
import MapDialog2 from "./MapDialog2";

export default function ShowInMap2({
  onClick,
  onClose,
  open,
  maps,
  nodesType,
  grounded = false,
  title = "Connectivity Map",
  onNodeClick = () => {},
  onNodeDoubleClick = () => {},
}) {
  return (
    <div>
      <Tooltip title={title} placement="bottom" disableInteractive>
        <IconButton onClick={() => onClick()}>
          <HubOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <ReactFlowProvider>
        <MapDialog2
          open={open}
          onClick={onClick}
          onClose={onClose}
          maps={maps}
          nodesType={nodesType}
          grounded={grounded}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
        />
      </ReactFlowProvider>
    </div>
  );
}
