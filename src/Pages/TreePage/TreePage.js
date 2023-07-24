import React from "react";
import TestResultsAccordion from "../../Components/TestResultsAccordion/TestResultsAccordion.js";
import Nav from "../../Components/Navbar/Nav.js";

function TreePage() {
  return (
    <div className="bg-white flex flex-col grow h-screen overflow-hidden">
      <Nav />
      <TestResultsAccordion />
    </div>
  );
}

export default TreePage;
