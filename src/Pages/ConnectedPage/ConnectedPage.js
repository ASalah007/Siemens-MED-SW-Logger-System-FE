import React, { useState } from "react";
import Nav from "../../Components/Navbar/Nav";
import ParticlesBackground from "../Welcome/ParticlesBackground";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function ConnectedPage() {
  const [connectedDatabase, setConnectedDatabase] = useState(
    sessionStorage.getItem("connectedDatabase")
  );
  const navigate = useNavigate();
  if (!connectedDatabase) navigate("/");

  function disconnect() {
    setConnectedDatabase(null);
    sessionStorage.removeItem("connectedDatabase");
  }

  return (
    <div className="grow bg-white flex flex-col h-screen">
      <Nav />
      <ParticlesBackground />
      <div className="flex flex-col justify-center items-center bg-white grow">
        <div className="mb-14 font-bold text-5xl text-center flex flex-col gap-3 z-10 translate-y-4">
          <span>Connected to {connectedDatabase}</span>
        </div>

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
          <Link to="/old/testsuits">
            <Button>Go to old Tables View</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConnectedPage;
