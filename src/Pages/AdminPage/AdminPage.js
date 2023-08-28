import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../Components/AdminSideBar/SideBar";
import SearchIcon from "@mui/icons-material/Search";
import NonActivatedTable from "../../Components/AdminTables/NonActivatedTable";
import ActiveUsersTable from "../../Components/AdminTables/ActiveUsersTable";
import UserContext from "../../Contexts/UserContext";
import { IconButton } from "@mui/material";

function AdminPage() {
  const [activated, setActivated] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const navigate = useNavigate();
  const user = React.useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!user.isAdmin) {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-full h-full min-h-screen bg-white flex">
      <div className="w-[22rem] fixed">
        <SideBar setActivated={setActivated} activated={activated} />
      </div>

      <div className="w-full mt-12 ml-[24rem] mr-[2rem]">
        <div className="flex md:flex-row flex-col justify-around ">
          <h1 className="font-poppins font-semibold text-[2.5rem]">
            {activated ? "Activated Users" : "Non Activated Users"}
          </h1>

          <div className="w-1/3 rounded-md flex items-center gap-1 px-3 bg-gray-200">
            <IconButton onClick={() => setFilterValue(searchValue)}>
              <SearchIcon />
            </IconButton>
            <input
              className="w-full focus:outline-none "
              type="search"
              name="HeaderSearch"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className="w-[95%]  mt-10 ">
          {!activated ? (
            <NonActivatedTable filterValue={filterValue} />
          ) : (
            <ActiveUsersTable filterValue={filterValue} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
