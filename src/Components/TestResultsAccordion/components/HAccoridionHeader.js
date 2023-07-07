import React from "react";

function HAccordionHeader({ title, failed, total, actionElements }) {
  return (
    <div className="bg-[#6a4c93] flex flex-col pb-4 pt-2 shadow h-28 overflow-hidden">
      <div className="flex justify-center text-2xl font-bold py-2 text-[#ffca3a] gap-1 items-baseline h-14">
        {title}
        {actionElements}
      </div>
      <div className="flex justify-between px-8">
        <div className="text-fail font-bold">
          Failed: {failed}/{total}
        </div>
        <div className="text-success font-bold">
          Passed: {total - failed}/{total}
        </div>
      </div>
    </div>
  );
}

export default HAccordionHeader;
