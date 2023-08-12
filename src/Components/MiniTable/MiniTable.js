import { Paper } from "@mui/material";
import React from "react";
import { titlize } from "../../Utils/utilities";

export default function MiniTable({ keys, data }) {
  if (!keys) keys = Object.keys(data);

  return (
    <Paper
      elevation={2}
      sx={{ maxWidth: "max-content", mb: "6px", minWidth: "max-content" }}
    >
      <table>
        <thead>
          <tr className="bg-[#08607b] text-white text-xl">
            <th className="p-2 text-start">Key</th>
            <th className="p-2 text-start">Value</th>
          </tr>
        </thead>
        <tbody>
          {keys
            .filter((k) => data[k])
            .map((k, i) => (
              <tr className={"" + (i % 2 === 1 && "bg-gray-200")}>
                <td className="p-1 pl-2">{titlize(k)}</td>
                <td className="p-1 pl-2">{data[k]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Paper>
  );
}
