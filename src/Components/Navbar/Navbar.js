import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ThemeButton from "../Theme/ThemeButton";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="z-10">
      <AppBar
        position="static"
        sx={{
          backgroundColor: "var(--body_color)",
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Container maxWidth="x">
          <ThemeButton />
          <Toolbar disableGutters>
            <InsertChartIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "#333333",
                fontWeight: "bold",
                textShadow: "1px 1px #cccccc",
              }}
              style={{ color: "white", fontSize: 50 }}
            />
            <Link to="/">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontSize: "18px",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".05rem",
                  color: "white",
                  textDecoration: "none",
                  textShadow: "0.5px 1px #cccccc",
                }}
              >
                TEST RESULTS VISUALIZER
              </Typography>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
