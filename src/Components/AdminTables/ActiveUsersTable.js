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
  fetchAllUsers,
  updateUserSolution,
} from "../../Services/authServices";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

export default function ActiveUsersTable() {
  const [users, setUsers] = useState([]);

  const [options, setOptions] = useState(["Ethernet", "5G", "OTN"]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmation, setdeleteConfirmation] = useState(false);

  useEffect(() => {
    fetchAllSolutions().then((data) => setOptions(data));
    fetchAllUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const [deleteSnackbar, setDeleteSnackbar] = useState(null);
  const [updateSnackbar, setUpdateSnackbar] = useState(null);

  return (
    <>
      <AdminTable
        loading={loading}
        columns={["Name", "Email", "Solution", "Actions"]}
        rows={users.map((user, i) => [
          user.name,
          user.email,
          <Solutions
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
          <div className="flex gap-1 justify-center">
            <Button
              size="small"
              onClick={() => {
                updateUserSolution(user._id, user.solutions).then((data) => {
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
            severity={updateSnackbar.status === "fail" ? "warning" : "success"}
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
    </>
  );
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
function Solutions({ values, handleChange, options }) {
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
