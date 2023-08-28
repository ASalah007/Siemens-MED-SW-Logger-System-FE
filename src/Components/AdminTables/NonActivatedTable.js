import React, { useEffect, useState } from "react";
import AdminTable from "./AdminTable";
import {
  activateUser,
  fetchAllActiveUsers,
  fetchUsers,
} from "./../../Services/authServices";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { Alert, Snackbar } from "@mui/material";

function NonActivatedTable({ filterValue = "" }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteConfirmation, setdeleteConfirmation] = useState(null);
  const [userApproved, setUserApproved] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);

  function handleUser(id, approve) {
    activateUser(id, approve)
      .then((res) => {
        res.status === "success" &&
          setUsers((o) => o.filter((u) => u._id !== id));
        if (approve) setUserApproved(true);
        else setUserDeleted(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchUsers(false).then((res) => {
      setUsers(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchUsers(false).then((data) =>
      setUsers(
        data.filter((u) =>
          JSON.stringify(u).toLowerCase().includes(filterValue.toLowerCase())
        )
      )
    );
  }, [filterValue, users]);

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
              onClick={() => setdeleteConfirmation(u)}
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
      <ConfirmationDialog
        open={deleteConfirmation}
        content="Please note that the user will be deleted and it can't be undone!"
        onClose={() => setdeleteConfirmation(null)}
        onConfirm={() => handleUser(deleteConfirmation._id, true)}
      />
      {(userApproved || userDeleted) && (
        <Snackbar
          open={!!(userApproved || userDeleted)}
          autoHideDuration={6000}
          onClose={() => setUserApproved(false)}
        >
          <Alert
            severity={userApproved.status === "fail" ? "warning" : "success"}
            sx={{ width: "100%" }}
            onClose={() => setUserDeleted(false)}
          >
            {userApproved
              ? "user successfully approved"
              : "user successfully deleted"}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default NonActivatedTable;
