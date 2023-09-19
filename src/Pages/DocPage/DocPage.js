import React, { useEffect, useState } from "react";
import Nav from "../../Components/Navbar/Nav";
import RFolder from "../../Components/Folder/RFolder";
import { Paper } from "@mui/material";

export default function DocPage() {
  const [objString, setObjString] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    try {
      setData(JSON.parse(objString));
    } catch (err) {
      console.log(error);
      setError(err);
    }
  }, [objString]);

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* rest of docs goes here */}

      <h1 className="text-2xl font-bold mb-10">Interactive Tree Visualizer</h1>
      <Paper className="flex min-h-[400px] rounded-xl p-2 gap-5" elevation={5}>
        <div className="grow flex flex-col">
          <h1 className="text-lg font-bold pb-2 border-b border-black">
            Object
          </h1>
          <textarea
            placeholder="{key:value}"
            className="bg-white grow resize-none focus:outline-none"
            value={objString}
            onChange={(e) => setObjString(e.target.value)}
          />
        </div>
        <div className="grow flex flex-col">
          <h1 className="font-bold text-lg pb-2 border-b border-black">
            Tree Folder
          </h1>
          <RFolder title="Parsed Tree" data={data} />
        </div>
      </Paper>
    </div>
  );
}
