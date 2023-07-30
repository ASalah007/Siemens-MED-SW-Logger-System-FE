import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

function BasePage() {
  return (
    <div className="flex flex-col min-h-screen max-h-screen ">
      <Navbar />
      <div className="grow flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}

export default BasePage;
