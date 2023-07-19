import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import TableViewIcon from "@mui/icons-material/TableView";
import TableDialog from "./TableDialog";

function ShowInTable({
  onClick,
  open,
  onClose,
  title,
  columns,
  data,
  onRowClick,
  sx,
  count,
  page,
  rowsPerPage,
  onRowsPerPageChange,
  onPageChange,
  nativePagination = false,
}) {
  return (
    <div>
      <Tooltip title="show in a table" placement="top" disableInteractive>
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
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        onPageChange={onPageChange}
        nativePagination={nativePagination}
      ></TableDialog>
    </div>
  );
}
export default ShowInTable;
