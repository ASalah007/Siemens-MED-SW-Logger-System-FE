import React, { useEffect, useState } from "react";
import AdminTable from "./AdminTable";
import { activateUser, fetchUsers } from "./../../Services/authServices";

function NonActivatedTable(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleUser(id, approve) {
    activateUser(id, approve)
      .then(
        (res) =>
          res.status === "success" &&
          setUsers((o) => o.filter((u) => u._id !== id))
      )
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchUsers(false).then((res) => {
      setUsers(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-10">
      <AdminTable
        columns={["Name", "Actions"]}
        loading={loading}
        rows={users?.map((u) => [
          u.name,
          <div key={u._id}>
            <button
              className="border-2 border-red-500 text-red-500 hover:bg-red-50 hover:shadow-inner font-bold py-2 px-4 rounded-lg uppercase"
              onClick={() => handleUser(u._id, false)}
            >
              Decline
            </button>
            <button
              className="bg-success hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg uppercase ml-6"
              onClick={() => handleUser(u._id, true)}
            >
              Approve
            </button>
          </div>,
        ])}
      />
    </div>
  );
}

export default NonActivatedTable;
