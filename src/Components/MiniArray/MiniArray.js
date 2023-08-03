import { Paper } from "@mui/material";
import React from "react";

export default function MiniArray({ data, title }) {
  return (
    <Paper
      elevation={2}
      sx={{ maxWidth: "max-content", mb: "6px", minWidth: "max-content" }}
    >
      <table>
        {title && (
          <thead>
            <tr className="bg-[#08607b] text-white text-xl">
              <th className="p-2 text-start">{title}</th>
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((v, i) => (
            <tr className={"" + (i % 2 === 1 && "bg-gray-200")}>
              <td className="p-1 pl-2">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  );
}
