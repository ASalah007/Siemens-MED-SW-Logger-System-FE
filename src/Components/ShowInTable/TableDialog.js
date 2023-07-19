import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import MUIDataTable from "mui-datatables";
import TablePagination from "../TablePagination/TablePagination";

function TableDialog(props) {
  const {
    onClose,
    open,
    title,
    onRowClick,
    columns,
    data,
    count,
    page,
    rowsPerPage,
    onRowsPerPageChange,
    onPageChange,
    nativePagination,
  } = props;

  const options = {
    filter: true,
    selectableRows: "none",
    ilterType: "multiselect",
    rowsPerPage: 10,
    pagination: nativePagination,

    draggableColumns: {
      enabled: true,
    },
    setCellProps: (value) => {
      const textColor =
        value === "fail" || value === "false"
          ? "text-red-400"
          : value === "true"
          ? "text-green-400"
          : "";

      return {
        className: "tableCell " + textColor,
      };
    },
    setRowProps: (row, rowIndex) => {
      let bg = "";
      if (row[1] === "false" || row[1] === "fail") bg = "bg-red-200";
      // else if (row[1] === "true" || row[1] === "pass") bg = "bg-green-200";
      else if (rowIndex % 2 === 1) bg = "bg-gray-200";

      return {
        className: bg,
        style: { cursor: "pointer" },
      };
    },
    onRowClick: (rowData, rowMeta) => {
      onRowClick && onRowClick(rowData, rowMeta);
    },
  };

  return (
    <Dialog
      onClose={() => {
        onClose();
      }}
      open={open}
      maxWidth="lg"
      scroll="body"
    >
      <DialogTitle className="flex items-center justify-end bg-gray-100">
        {onClose ? (
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent className="bg-gray-100">
        <div className="">
          <MUIDataTable
            title={title}
            columns={columns}
            data={data}
            options={options}
          />
          {!nativePagination && (
            <div className="flex justify-end">
              <TablePagination
                count={count}
                page={page}
                onRowsPerPageChange={onRowsPerPageChange}
                onPageChange={onPageChange}
                rowsPerPage={rowsPerPage}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TableDialog;
