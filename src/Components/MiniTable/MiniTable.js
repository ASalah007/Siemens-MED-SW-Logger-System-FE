import { Paper } from "@mui/material";
import React from "react";

export default function MiniTable({ keys, data }) {
  console.log({ keys, data });
  return (
    <Paper elevation={2} sx={{ maxWidth: "max-content", mb: "6px" }}>
      <table>
        <thead>
          <tr className="bg-[#08607b] text-white text-xl">
            <th className="p-2 text-start">Key</th>
            <th className="p-2 text-start">Value</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((k, i) => (
            <tr className={"" + (i % 2 === 1 && "bg-gray-200")}>
              <td className="p-1 pl-2">{k}</td>
              <td className="p-1 pl-2">{data[k]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  );
}
