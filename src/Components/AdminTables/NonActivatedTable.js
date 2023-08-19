import React from "react";
import AdminTable from "./AdminTable";
import {activateUser} from "./../../Services/authServices"

function NonActivatedTable(props) {

  function handleUser(id, approve) {
    activateUser(id, approve)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

    window.reload()
  }

  return (
    <AdminTable
      columns={["Name", "Actions"]}
      rows={props.users?.map((u) => [
        u.name,
        <div>
          <button className="border-2 border-red-500 text-red-500 hover:bg-red-50 hover:shadow-inner font-bold py-2 px-4 rounded-lg uppercase"
          onClick={() => handleUser(u._id, false)}>
            Decline
          </button>
          <button className="bg-success hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg uppercase ml-6"
          onClick={() => handleUser(u._id, true)}>
            Approve
          </button>
        </div>,
      ])}
    />
  );
}

export default NonActivatedTable;
