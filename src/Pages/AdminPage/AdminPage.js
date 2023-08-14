import React, { useState } from "react";
import SideBar from "../../Components/AdminSideBar/SideBar";
import SearchIcon from "@mui/icons-material/Search";
import NonActivatedTable from "../../Components/AdminTables/NonActivatedTable";

function AdminPage() {
  const [activated, setActivated] = useState(false);

  return (
    <div className="w-full h-full min-h-screen bg-white flex">
      <div className="w-[22rem]">
        <SideBar setActivated={setActivated} activated={activated} />
      </div>


      <div className="w-full mt-12">
        <div className="flex  justify-around">
          <h1 className="font-poppins font-semibold text-[2.5rem]">
            {activated ? "Activated Users" : "Non Activated Users"}
          </h1>

          <div className=" w-1/3 px-2 py-1  rounded-md flex  bg-black bg-opacity-5 ">
            <button className=" text-black mx-[2rem]">
              <SearchIcon />
            </button>
            <input
              className="w-full focus:outline-none "
              type="search"
              name="HeaderSearch"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="w-[95%] mt-[5rem] shadow-lg ml-auto ">{!activated ? <NonActivatedTable /> : null}</div>
      </div>
    </div>
  );
}

export default AdminPage;
