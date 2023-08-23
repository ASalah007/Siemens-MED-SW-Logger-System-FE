import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { LinearProgress } from "@mui/material";
import EmptyTable from "../../Resources/empty_table.png";

export default function AdminTable({ columns, rows, loading }) {
  return (
    <>
      {rows.length == 0 && !loading ? (
        <div className="mt-12 flex flex-col items-center">
          <h2 className="font-poppins font-semibold text-5xl text-Blue">
            No Current Users
          </h2>
          <img src={EmptyTable} alt="illustration" className="w-[40%]" />
        </div>
      ) : loading ? (
        <LinearProgress />
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
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
      )}
    </>
  );
}
