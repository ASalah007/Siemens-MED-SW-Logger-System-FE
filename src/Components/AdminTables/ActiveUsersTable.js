import React, { useEffect, useState } from "react";
import AdminTable from "./AdminTable";
import {
  Alert,
  Autocomplete,
  Button,
  Checkbox,
  Snackbar,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  deleteUser,
  fetchAllSolutions,
  fetchAllActiveUsers,
  updateUser,
  fetchDatabases,
} from "../../Services/authServices";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

export default function ActiveUsersTable({ filterValue = "" }) {
  const [users, setUsers] = useState([]);

  const [options, setOptions] = useState(["Ethernet", "5G", "OTN"]);
  const [deleteOptions, setDeleteOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmation, setdeleteConfirmation] = useState(false);

  useEffect(() => {
    fetchAllSolutions().then((data) => setOptions(data));
    fetchAllActiveUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
    fetchDatabases().then((data) => setDeleteOptions(data));
  }, []);

  useEffect(() => {
    fetchAllActiveUsers().then((data) =>
      setUsers(
        data.filter((u) =>
          JSON.stringify(u).toLowerCase().includes(filterValue.toLowerCase())
        )
      )
    );
  }, [filterValue, users]);

  const [deleteSnackbar, setDeleteSnackbar] = useState(null);
  const [updateSnackbar, setUpdateSnackbar] = useState(null);

  return (
    <div className="p-12">
      <AdminTable
        loading={loading}
        columns={["Name", "Solution", "Delete Permissions", "Actions"]}
        rows={users.map((user, i) => [
          user.name,
          <AdminSelect
            values={user.solutions}
            handleChange={(e, v) =>
              setUsers((o) => {
                const nw = [...o];
                nw[i].solutions = v;
                return nw;
              })
            }
            options={options}
          />,

          <AdminSelect
            values={user.deletableDatabases}
            handleChange={(e, v) =>
              setUsers((o) => {
                const nw = [...o];
                nw[i].deletableDatabases = v;
                return nw;
              })
            }
            options={deleteOptions}
          />,
          <div className="flex gap-1 justify-center">
            <Button
              size="small"
              onClick={() => {
                updateUser(
                  user._id,
                  user.solutions,
                  user.deletableDatabases
                ).then((data) => {
                  setUpdateSnackbar({
                    status: data.status,
                    message: data.message,
                  });
                });
              }}
            >
              Apply
            </Button>
            <Button
              size="small"
              color="error"
              onClick={() => {
                setdeleteConfirmation(user);
              }}
            >
              delete
            </Button>
          </div>,
        ])}
      />

      <ConfirmationDialog
        open={deleteConfirmation}
        content="Please note that the user will be deleted and it can't be undone!"
        onClose={() => setdeleteConfirmation(null)}
        onConfirm={() => {
          deleteUser(deleteConfirmation._id).then((data) => {
            setDeleteSnackbar({
              status: data.status,
              message: data.message,
            });
            if (data.status === "success") {
              setUsers((o) =>
                o.filter((u) => u._id !== deleteConfirmation._id)
              );
            }
          });
        }}
      />

      {updateSnackbar && (
        <Snackbar
          open={!!updateSnackbar}
          autoHideDuration={6000}
          onClose={() => setUpdateSnackbar(null)}
        >
          <Alert
            severity={
              updateSnackbar.status === "success" ? "success" : "warning"
            }
            sx={{ width: "100%" }}
            onClose={() => setUpdateSnackbar(null)}
          >
            {updateSnackbar.message}
          </Alert>
        </Snackbar>
      )}

      {deleteSnackbar && (
        <Snackbar
          open={!!deleteSnackbar}
          autoHideDuration={6000}
          onClose={() => setDeleteSnackbar(null)}
        >
          <Alert
            severity={deleteSnackbar.status === "fail" ? "warning" : "success"}
            sx={{ width: "100%" }}
            onClose={() => setDeleteSnackbar(null)}
          >
            {deleteSnackbar.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
function AdminSelect({ values, handleChange, options = [] }) {
  return (
    <Autocomplete
      size="small"
      multiple
      freeSolo
      disableCloseOnSelect
      value={values}
      onChange={handleChange}
      options={options}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} sx={{ textAlign: "left" }} />
      )}
    />
  );
}
