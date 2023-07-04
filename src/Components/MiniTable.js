import React from "react";

function Row({ key_, value, gray }) {
  return (
    <div className={"flex px-2 py-[2px] " + (gray && "bg-gray-200")}>
      <div className="mr-1 whitespace-nowrap">{key_}:</div>
      <div className="overflow-auto">{value}</div>
    </div>
  );
}
export default function MiniTable({ keys, data }) {
  return (
    <div className="max-w-fit">
      {keys.map((key, i) =>
        Array.isArray(data[key]) ? (
          data[key].map((e, j) => (
            <Row key_={key} value={e} gray={(i + j) % 2 === 0} />
          ))
        ) : (
          <Row key={key} key_={key} value={data[key]} gray={i % 2 === 0} />
        )
      )}
    </div>
  );
}
