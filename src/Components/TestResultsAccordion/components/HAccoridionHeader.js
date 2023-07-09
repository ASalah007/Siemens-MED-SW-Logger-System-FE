import React from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { IconButton, Tooltip } from "@mui/material";

function HAccordionHeader({
  title,
  failed,
  total,
  actionElements,
  minimize,
  onMinimize,
  onPassedClick,
  onFailedClick,
}) {
  return (
    <div className="bg-[#6a4c93] flex flex-col pb-4 pt-2 shadow h-28 overflow-hidden">
      <div className="flex justify-center text-2xl font-bold py-2 text-[#ffca3a] gap-1 items-baseline h-14 relative">
        {title}
        {actionElements}
        <div className="absolute right-1 -top-1">
          <Tooltip title="Minimize" placement="top" disableInteractive>
            <IconButton onClick={() => onMinimize && onMinimize()}>
              <KeyboardDoubleArrowLeftIcon sx={{ color: "#ffca3a" }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="flex justify-between px-8">
        <div
          className="text-fail font-bold hover:cursor-pointer select-none"
          onClick={() => onFailedClick && onFailedClick()}
        >
          Failed: {failed}/{total}
        </div>
        <div
          className="text-success font-bold hover:cursor-pointer select-none"
          onClick={() => onPassedClick && onPassedClick()}
        >
          Passed: {total - failed}/{total}
        </div>
      </div>
    </div>
  );
}

export default HAccordionHeader;
