import React, { useRef, useState } from "react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { titlize } from "../../Utils/utilities";

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
  const ref = useRef();

  if (typeof title === "string") title = titlize(title);

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
      {!collapsed && (
        <div ref={ref} className="ml-[11px] pl-2 border-l-2 border-slate-300">
          {children}
        </div>
      )}
    </div>
  );
}

export default Folder;
