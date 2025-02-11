import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ParticlesBackground from "./ParticlesBackground";
import { deleteDatabase } from "../../Services/authServices";
import Nav from "../../Components/Navbar/Nav";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UserContext from "../../Contexts/UserContext";
import { fetchDatabasesNew } from "../../Services/authServices";

function HomePage() {
  const user = React.useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [databases, setDatabases] = useState({});
  const [database, setDatabase] = useState("");
  const [connectedDatabase, setConnectedDatabase] = useState(
    sessionStorage.getItem("connectedDatabase")
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [databaseToDelete, setDatabaseToDelete] = useState(false);
  const [deleteResult, setDeleteResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  function connectToDatabase(database) {
    sessionStorage.setItem("connectedDatabase", database);
    setConnectedDatabase(database);
  }

  useEffect(() => {
    if (connectedDatabase) navigate("/connected");
    fetchDatabasesNew().then((dbs) => {
      setDatabases(dbs.result);
      setLoading(false);
    });
  }, [connectedDatabase, navigate]);

  // put a default value in the select box
  useEffect(() => {
    Object.values(databases).some((e) =>
      e.some((d) => {
        setDatabase(d);
        return true;
      })
    );
  }, [databases]);

  const mappedDatabases = [];

  for (var key in databases) {
    mappedDatabases.push(...databases[key]);
  }

  function renderSelectGroup(solution, solutionDatabases) {
    const items = solutionDatabases.map((db) => {
      return (
        <MenuItem value={db} key={db}>
          <div className="flex justify-between items-center w-full">
            <div>{db}</div>
            {(user.deletePermissions?.includes(solution) || user.isAdmin) && (
              <IconButton
                onClick={() => {
                  setOpenConfirmation(true);
                  setDatabaseToDelete(db);
                }}
              >
                <DeleteOutlineIcon className="text-fail" />
              </IconButton>
            )}
          </div>
        </MenuItem>
      );
    });
    return [
      <p className=" font-semibold font-poppins text-lg text-Blue ml-2 my-2">
        {solution}
      </p>,
      items,
    ];
  }

  return loading ? (
    <div className="grow bg-white flex justify-center items-center h-screen">
      <CircularProgress thickness={3} />
    </div>
  ) : (
    <div className="grow bg-white flex flex-col h-screen">
      <Nav />
      <ParticlesBackground />
      <div className="flex flex-col justify-center items-center bg-white grow">
        {/* Welcome Message */}
        <div className="mb-14 font-bold text-5xl text-center flex flex-col gap-3 z-10 translate-y-4">
          <span>Welcome {user.name}!</span>
          <span>Please choose a database.</span>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-12 items-center z-10 translate-y-10">
          <div className="bg-gray-100 p-1 rounded-[28px] border border-black flex gap-3 justify-between">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
                sx={{ width: "250px" }}
                renderValue={(v) => v}
              >
                {Object.entries(databases).map(
                  ([solution, solutionDatabases]) =>
                    renderSelectGroup(solution, solutionDatabases)
                )}
              </Select>
              <Dialog
                open={openConfirmation}
                onClose={() => setOpenConfirmation(false)}
                maxWidth="xs"
              >
                <DialogTitle>Are you Sure !</DialogTitle>
                <DialogContent>
                  Please note that this action can NOT be undone.
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenConfirmation(false)} autoFocus>
                    Cancel
                  </Button>
                  <Button
                    color="error"
                    onClick={() => {
                      setOpenConfirmation(false);
                      deleteDatabase(databaseToDelete).then((res) => {
                        setDeleteResult(res.status);
                        setResultMessage(res.message);
                        setOpenSnackbar(true);
                        navigate(0);
                      });
                    }}
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </FormControl>
            <Button
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                borderRadius: "24px",
                padding: "0 3.6rem",
                backgroundColor: "#0F62FE",
              }}
              onClick={() => connectToDatabase(database)}
            >
              Connect
            </Button>
          </div>
          <div className="flex gap-10">
            {mappedDatabases
              .filter((d, i) => i < 3)
              .map((d) => (
                <Button
                  sx={{ color: "#0F62FE", fontWeight: "bold" }}
                  onClick={() => connectToDatabase(d)}
                  key={d}
                >
                  {d}
                </Button>
              ))}
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity={deleteResult === "fail" ? "warning" : "success"}
          sx={{ width: "100%" }}
          onClose={() => setOpenSnackbar(false)}
        >
          {resultMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default HomePage;
