import React, { useState } from "react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

function Folder({
  title,
  children,
  open,
  onClick,
  active,
  actionElements,
  noArrow = false,
}) {
  const [collapsed, setCollapsed] = useState(!open);
  return (
    <div className="flex flex-col gap-1">
      <div
        className={
          "flex items-center hover:cursor-pointer h-11 " +
          (active ? "bg-blue-200" : "hover:bg-blue-100")
        }
      >
        <div
          className="text-slate-500 "
          onClick={() => setCollapsed((o) => !o)}
          style={{ visibility: noArrow && "hidden" }}
        >
          {collapsed ? <ArrowRightRoundedIcon /> : <ArrowDropDownRoundedIcon />}
        </div>
        <div
          className={"grow px-1 self-stretch flex items-center"}
          onClick={onClick ? onClick : () => setCollapsed((o) => !o)}
        >
          {title}
        </div>
        <div className="pr-2">{actionElements}</div>
      </div>
      {!collapsed && <div className="pl-5">{children}</div>}
    </div>
  );
}

export default Folder;
