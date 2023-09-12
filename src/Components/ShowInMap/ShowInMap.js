import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import MapDialog from "./MapDialog";
import { ReactFlowProvider } from "reactflow";

function ShowInMap({ onClick, onClose, open, maps }) {
  return (
    Object.keys(maps).length > 0 && (
      <div>
        <Tooltip
          title={"DUT Connectivity Map"}
          placement="bottom"
          disableInteractive
        >
          <IconButton onClick={() => onClick()}>
            <HubOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <ReactFlowProvider>
          <MapDialog
            open={open}
            onClick={onClick}
            onClose={onClose}
            maps={maps}
          />
        </ReactFlowProvider>
      </div>
    )
  );
}

export default ShowInMap;
