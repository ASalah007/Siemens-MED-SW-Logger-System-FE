import React, { useState } from "react";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import Users from "../../Resources/users.svg";
import "animate.css";

function SideBar(props) {

  return (
    <div className="w-full min-h-screen shadow-lg flex flex-col py-12">
      <div className="w-[50%] flex items-center gap-4 ml-[3rem]">
        <BarChartRoundedIcon
          style={{ fill: "#1976D2", width: "4rem", height: "4rem" }}
        />
        <h2 className="font-poppins font-bold text-[2rem] leading-8">
          Admin Center
        </h2>
      </div>
      <div className="ml-[3rem] mt-[5rem]">
        <div className="flex items-end gap-4">
          <img className="w-[2.5rem]" src={Users} alt="icon" />
          <h3 className="font-poppins font-semibold text-[1.8rem]">Users</h3>
        </div>
        <ul className="mt-[2rem]">
          <li
            onClick={() => props.setActivated(false)}
            className={`${
              !props.activated
                ? "text-[1.3rem] font-bold text-Blue after:content-[''] after:w-2 after:h-[100%] after:bg-Blue after:absolute  after:left-[-3rem] after:rounded-r-[0.5rem]"
                : ""
            } text-[1.3rem] font-poppins relative cursor-pointer`}
          >
            Non Activated
          </li>
          <li
            onClick={() => props.setActivated(true)}
            className={`${
              props.activated 
              ? "text-[1.3rem] font-bold text-Blue after:content-[''] after:w-2 after:h-[100%] after:bg-Blue after:absolute  after:left-[-3rem] after:rounded-r-[0.5rem]" 
              : ""
            } text-[1.3rem] font-poppins mt-3 relative cursor-pointer`}
          >
            Activated
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
