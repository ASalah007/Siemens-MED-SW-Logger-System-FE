import React, { useEffect, useState } from "react";
import TestResultsAccordion from "../../Components/TestResultsAccordion/TestResultsAccordion.js";
import { CircularProgress } from "@mui/material";
import { fetchTestSuites } from "../../Services/services.js";
import Nav from "../../Components/Navbar/Nav.js";

function TreePage() {
  const [testSuites, setTestSuites] = useState(null);
  useEffect(() => {
    fetchTestSuites().then((data) => {
      setTestSuites(data);
    });
  }, []);

  return !testSuites ? (
    <div className="grow flex justify-center items-center h-screen">
      <CircularProgress thickness={3} size={"3.5rem"} />
    </div>
  ) : (
    <div className="bg-white flex flex-col grow h-screen overflow-hidden">
      <Nav />
      <TestResultsAccordion testSuites={testSuites} />
    </div>
  );
}

export default TreePage;
