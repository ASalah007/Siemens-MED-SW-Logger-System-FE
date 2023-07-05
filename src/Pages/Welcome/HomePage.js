import { Button, FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { databases } from "../../data";
import ParticlesBackground from "./ParticlesBackground";

function HomePage() {
  const [open, setOpen] = useState(false);
  const [database, setDatabase] = useState(databases[0]);
  return (
    <div className="grow bg-red-100 flex flex-col">
      <div className="flex flex-col justify-center items-center bg-white grow">
        <ParticlesBackground />
        <div className="mb-10 font-bold text-5xl text-center flex flex-col gap-3 z-10">
          <span>Welcome !</span>
          <span>Please choose a database.</span>
        </div>
        <div className="flex flex-col gap-20 items-center z-10">
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
            >
              Connect
            </Button>
          </div>
          <div className="flex gap-10">
            {databases
              .filter((d, i) => i < 3)
              .map((d) => (
                <Button sx={{ color: "#0F62FE", fontWeight: "bold" }}>
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
