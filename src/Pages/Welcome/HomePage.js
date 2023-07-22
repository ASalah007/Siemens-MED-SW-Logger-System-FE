import { Button, FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ParticlesBackground from "./ParticlesBackground";
import { LoadingButton } from "@mui/lab";
import { fetchDatabases } from "../../Services/services";
import Nav from "../../Components/Navbar/Nav";
import { Navigate, useNavigate } from "react-router-dom";

function HomePage() {
  const [open, setOpen] = useState(false);
  const [databases, setDatabases] = useState([]);
  const [database, setDatabase] = useState("");
  const [connectedDatabase, setConnectedDatabase] = useState(
    sessionStorage.getItem("connectedDatabase")
  );

  function connectToDatabase(database) {
    sessionStorage.setItem("connectedDatabase", database);
    setConnectedDatabase(database);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (connectedDatabase) navigate("/connected");
    fetchDatabases().then((databases) => {
      setDatabases(databases);
      setDatabase(databases[0]);
    });
  }, [connectedDatabase, navigate]);

  return (
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
              >
                {databases.map((d) => (
                  <MenuItem value={d} key={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
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
    </div>
  );
}

export default HomePage;
