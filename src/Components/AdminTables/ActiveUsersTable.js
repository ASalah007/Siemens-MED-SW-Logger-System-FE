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
import { fetchAllSolutions } from "../../Services/authServices";

export default function ActiveUsersTable() {
  const [users, setUsers] = useState([
    {
      name: "User1",
      email: "test1@gmail.com",
      solutions: ["Ethernet", "5G", "OTN"],
    },
    { name: "User2", email: "test2@gmail.com", solutions: ["Ethernet"] },
    { name: "User3", email: "test3@gmail.com", solutions: [] },
    { name: "User4", email: "test4@gmail.com", solutions: [] },
    { name: "User5", email: "test5@gmail.com", solutions: [] },
    { name: "User6", email: "test6@gmail.com", solutions: [] },
    { name: "User7", email: "test7@gmail.com", solutions: [] },
    { name: "User8", email: "test8@gmail.com", solutions: [] },
  ]);

  const [options, setOptions] = useState(["Ethernet", "5G", "OTN"]);
  useEffect(() => {
    fetchAllSolutions().then((data) => setOptions(data));
  }, []);

  const [deleteSnackbar, setDeleteSnackbar] = useState(false);
  const [deleteResult, setDeleteResult] = useState({ status: "", message: "" });
  return (
    <>
      <AdminTable
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
            <Button size="small">Apply</Button>
            <Button
              size="small"
              color="error"
              onClick={() => {
                // TODO: call api
                setDeleteSnackbar(true);
                setDeleteResult({
                  status: "success",
                  message: "User deleted successfully",
                });
              }}
            >
              delete
            </Button>
          </div>,
        ])}
      />

      <Snackbar
        open={deleteSnackbar}
        autoHideDuration={6000}
        onClose={() => setDeleteSnackbar(false)}
      >
        <Alert
          severity={deleteResult.status === "fail" ? "warning" : "success"}
          sx={{ width: "100%" }}
          onClose={() => setDeleteSnackbar(false)}
        >
          {deleteResult.message}
        </Alert>
      </Snackbar>
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
