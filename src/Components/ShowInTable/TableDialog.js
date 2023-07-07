import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import MUIDataTable from "mui-datatables";

function TableDialog(props) {
  const { onClose, open, title, onRowClick, columns, data } = props;

  const options = {
    filter: true,
    selectableRows: "none",
    ilterType: "multiselect",
    rowsPerPage: 10,

    draggableColumns: {
      enabled: true,
    },
    setCellProps: () => {
      return {
        className: "tableCell",
      };
    },
    setRowProps: (row, rowIndex) => {
      return {
        className: rowIndex % 2 === 1 && "bg-gray-200",
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
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TableDialog;
