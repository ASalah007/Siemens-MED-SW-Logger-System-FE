import React from "react";
import MiniTable from "../MiniTable/MiniTable";
import Folder from "./Folder";

export default function RFolder(props) {
  const { data } = props;
  return (
    <Folder {...props}>
      {Object.values(data).every((ele) => ele instanceof Object) ? (
        Object.keys(data).map((k) => <RFolder title={k} data={data[k]} />)
      ) : (
        <MiniTable data={data} />
      )}
    </Folder>
  );
}
