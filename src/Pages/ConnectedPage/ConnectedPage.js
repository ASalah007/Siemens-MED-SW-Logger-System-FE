import React, { useState } from "react";
import Nav from "../../Components/Navbar/Nav";
import ParticlesBackground from "../Welcome/ParticlesBackground";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

const ts = [
  {
    color: "#ff595e",
    id: "Fail",
    value: 32,
  },
  {
    color: "#6ede87",
    id: "Pass",
    value: 45,
  },
];
const tc = [
  {
    color: "#ff595e",
    id: "Fail",
    value: 10,
  },
  {
    color: "#6ede87",
    id: "Pass",
    value: 20,
  },
];
const vt = [
  {
    color: "#ff595e",
    id: "Fail",
    value: 95,
  },
  {
    color: "#6ede87",
    id: "Pass",
    value: 13,
  },
];
const vp = [
  {
    color: "#ff595e",
    id: "Fail",
    value: 50,
  },
  {
    color: "#6ede87",
    id: "Pass",
    value: 100,
  },
];
export default function ConnectedPage() {
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
      <div className="flex flex-col justify-center items-center bg-white grow gap-14">
        <div className="mb-4 font-bold text-5xl text-center flex flex-col gap-3 z-10 translate-y-4">
          <span>Connected to {connectedDatabase}</span>
        </div>

        <div className="flex items-center gap-8 mb-5">
          <PieChart data={ts} title="Test Suites" />
          <PieChart data={tc} title="Test Cases" />
          <PieChart data={vt} title="Validation Tags" />
          <PieChart data={vp} title="Validation Points" />
        </div>

        <div className="flex flex-col items-center gap-6">
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
function PieChart({ data, title }) {
  return (
    <div className="h-44 w-44 flex flex-col items-center gap-1">
      <ResponsivePie
        activeOuterRadiusOffset={5}
        animate
        innerRadius={0.45}
        colors={{ datum: "data.color" }}
        data={data}
        legends={[]}
        margin={{
          top: 10,
          bottom: 10,
          right: 10,
          left: 10,
        }}
        height={170}
        width={170}
        borderWidth={1}
        borderColor={"#000"}
        arcLabelsTextColor={"#fff"}
        padAngle={2.5}
        cornerRadius={2}
        enableArcLinkLabels={false}
      />
      <div className="font-bold text-xl">{title}</div>
    </div>
  );
}
