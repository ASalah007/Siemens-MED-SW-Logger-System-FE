import { createTheme, ThemeProvider } from "@mui/material";
import MUIDataTable from "mui-datatables";
import React from "react";

export default function MiniTable({ keys, data }) {
  const getTableTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              padding: "3px 5px",
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              color: "#FFF",
              fontWeight: "bold",
              fontSize: "1.1rem",
              padding: "6px 6px",
            },
          },
        },
      },
    });

  return (
    <div className="max-w-fit pb-3 minitable">
      <ThemeProvider theme={getTableTheme()}>
        <MUIDataTable
          data={keys.map((k) => [k, data[k]])}
          columns={["Key", "Value"]}
          options={{
            download: false,
            filter: false,
            pagination: false,
            print: false,
            search: false,
            viewColumns: false,
            selectableRows: false,
            elevation: 2,
            sort: false,
            rowHover: false,
            setRowProps: (row, rowIndex) => {
              return {
                className: rowIndex % 2 === 1 && "bg-gray-200",
              };
            },
          }}
        />
      </ThemeProvider>
    </div>
  );
}
