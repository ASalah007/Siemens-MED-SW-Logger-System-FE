import React from "react";
import { Link } from "react-router-dom";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import UserContext from "../../Contexts/UserContext";
import { IconButton, Tooltip } from "@mui/material";
import { logout } from "../../Services/services";

function Nav() {
  const connectedDatabase = sessionStorage.getItem("connectedDatabase");
  const user = React.useContext(UserContext);

  return (
    <div className="flex justify-between h-16 items-center px-5 shrink-0 bg-[#08607b] text-white z-10 ">
      <div>
        <Link to="/" className="flex gap-2 items-center text-xl">
          <BarChartRoundedIcon sx={{ fontSize: "2.25rem" }} />
          <span className="font-bold">TEST RESULTS VISUALIZER</span>
        </Link>
      </div>
      <div className="flex gap-6 items-baseline">
        <Link to="/search">
          <IconButton>
            <SearchRoundedIcon className="text-white" />
          </IconButton>
        </Link>
        {user.isAdmin && (
          <Link to="/admin" className="font-semibold">
            Admin Center
          </Link>
        )}

        <Link to="/connected" className="flex gap-2 items-baseline font-bold">
          {connectedDatabase}
          <Tooltip
            title={
              connectedDatabase ? "Connected Successfully" : "Not Connected"
            }
          >
            <div
              className={
                "w-2 h-2 rounded-full " +
                (connectedDatabase ? "bg-green-300" : "bg-red-300")
              }
            ></div>
          </Tooltip>
        </Link>
        <Link to="/login" onClick={() => logout()}>
          <LogoutIcon className="text-white" />
          <span className="font-semibold ml-1">Logout</span>
        </Link>

        <Tooltip title={`Logged as ${user.name}`}>
          <div className="font-bold text-sm hover:cursor-default">
            {user.name}
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default Nav;
