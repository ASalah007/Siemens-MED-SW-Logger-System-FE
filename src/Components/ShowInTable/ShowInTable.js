import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import TableViewIcon from "@mui/icons-material/TableView";
import TableDialog from "./TableDialog";
import MUIDataTable from "mui-datatables";

function ShowInTable({
  onClick,
  open,
  onClose,
  title,
  columns,
  data,
  onRowClick,
  sx,
}) {
  return (
    <div>
      <Tooltip title={"show in a table"} placement="top" disableInteractive>
        <IconButton onClick={() => onClick()} sx={sx}>
          <TableViewIcon />
        </IconButton>
      </Tooltip>

      <TableDialog
        open={open}
        onClose={onClose}
        title={title}
        columns={columns}
        data={data}
        onRowClick={onRowClick}
      ></TableDialog>
    </div>
  );
}
export default ShowInTable;
