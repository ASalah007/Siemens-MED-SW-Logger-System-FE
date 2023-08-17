import React, { useState, useEffect } from "react";
import SideBar from "../../Components/AdminSideBar/SideBar";
import SearchIcon from "@mui/icons-material/Search";
import NonActivatedTable from "../../Components/AdminTables/NonActivatedTable";
import ActiveUsersTable from "../../Components/AdminTables/ActiveUsersTable";
import { fetchUsers } from "../../Services/authServices";

function AdminPage() {
  const [activated, setActivated] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const resp = fetchUsers(activated);
    setUsers(resp);
    console.log(users);
   }, [activated]);

  return (
    <div className="w-full h-full min-h-screen bg-white flex">
      <div className="w-[22rem] fixed">
        <SideBar setActivated={setActivated} activated={activated} />
      </div>

      <div className="w-full mt-12 ml-[22rem]">
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

        <div className="p-10">
          {!activated ? <NonActivatedTable users= {users}/> : <ActiveUsersTable />}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
