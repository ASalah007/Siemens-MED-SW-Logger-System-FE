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
import { deleteDatabase, fetchDatabases } from "../../Services/services";
import Nav from "../../Components/Navbar/Nav";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function HomePage() {
  const [open, setOpen] = useState(false);
  const [databases, setDatabases] = useState([]);
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
    fetchDatabases().then((databases) => {
      setDatabases(databases);
      setDatabase(databases[0]);
      setLoading(false);
    });
  }, [connectedDatabase, navigate]);

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
          <span>Welcome !</span>
          <span>Please choose a database.</span>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-12 items-center z-10 translate-y-10">
          <div className="bg-gray-100 p-1 rounded-3xl border border-black flex gap-3 justify-between">
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
                {databases.map((d) => (
                  <MenuItem value={d} key={d}>
                    <div className="flex justify-between items-center w-full">
                      <div>{d}</div>
                      <IconButton
                        onClick={() => {
                          setOpenConfirmation(true);
                          setDatabaseToDelete(d);
                        }}
                      >
                        <DeleteOutlineIcon className="text-fail" />
                      </IconButton>
                    </div>
                  </MenuItem>
                ))}
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
                        setDatabases(
                          databases.filter((e) => e !== databaseToDelete)
                        );
                        setDatabase(
                          databases.filter((e) => e !== databaseToDelete)[0]
                        );
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
                borderRadius: "1.5rem",
                padding: "0 3.6rem",
                backgroundColor: "#0F62FE",
              }}
              onClick={() => connectToDatabase(database)}
            >
              Connect
            </Button>
          </div>
          <div className="flex gap-10">
            {databases
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
