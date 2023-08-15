import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function AdminTable({ columns, rows }) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={5}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "white", color: "green" }}>
              {columns.map((column) => (
                <TableCell key={column} align="center">
                  <div className="text-3xl font-semibold">{column}</div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow>
                  {row.map((entry) => (
                    <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                      {entry}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
