import { Button, FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ParticlesBackground from "./ParticlesBackground";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import { fetchDatabases } from "../../Services/services";
import Cookies from "universal-cookie";

function HomePage() {
  const [open, setOpen] = useState(false);
  const [databases, setDatabases] = useState([]);
  const [database, setDatabase] = useState("");
  const cookies = new Cookies();
  const [connectedDatabase, setConnectedDatabase] = useState(
    cookies.get("connectedDatabase")
  );
  const [loading, setLoading] = useState(false);

  function connectToDatabase(database) {
    setLoading(true);
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    cookies.set("connectedDatabase", database, {
      path: "/",
      expires: tomorrow,
    });
    setConnectedDatabase(database);
    setLoading(false);
  }

  function disconnect() {
    setConnectedDatabase(null);
    cookies.remove("connectedDatabase");
  }

  useEffect(() => {
    fetchDatabases().then((databases) => {
      setDatabases(databases);
      setDatabase(databases[0]);
    });
  }, []);

  return (
    <div className="grow bg-red-100 flex flex-col">
      <ParticlesBackground />
      <div className="flex flex-col justify-center items-center bg-white grow">
        {/* Welcome Message */}
        <div className="mb-14 font-bold text-5xl text-center flex flex-col gap-3 z-10 translate-y-4">
          {connectedDatabase ? (
            <>
              <span>Connected to {database}</span>
            </>
          ) : (
            <>
              <span>Welcome !</span>
              <span>Please choose a database.</span>
            </>
          )}
        </div>

        {/* Controls */}
        {connectedDatabase ? (
          <div className="flex flex-col items-center gap-6 translate-y-10">
            <div className="flex gap-6">
              <Link to="/tree">
                <Button
                  variant="contained"
                  size="large"
                  sx={{ padding: "1rem 2rem", borderRadius: "2rem" }}
                >
                  Tree View
                </Button>
              </Link>
              <Button
                variant="contained"
                color="error"
                size="large"
                sx={{
                  padding: "1rem 2rem",
                  borderRadius: "2rem",
                }}
                onClick={() => disconnect()}
              >
                Disconnect
              </Button>
            </div>
            <Link to="/testsuits">
              <Button>Go to old Tables View</Button>
            </Link>
          </div>
        ) : (
          <>
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
                <LoadingButton
                  loading={loading}
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
                </LoadingButton>
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
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
