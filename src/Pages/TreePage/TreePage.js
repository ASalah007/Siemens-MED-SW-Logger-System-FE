import React, { useEffect, useState } from "react";
import TestResultsAccordion from "../../Components/TestResultsAccordion/TestResultsAccordion.js";
import { fetchStatistics, fetchTestSuites } from "../../Services/services.js";
import Nav from "../../Components/Navbar/Nav.js";
import { useTestResultsEntryState } from "../../Components/TestResultsAccordion/Hooks/TestResultsEntryHook.js";

function TreePage() {
  return (
    <div className="bg-white flex flex-col grow h-screen overflow-hidden">
      <Nav />
      <TestResultsAccordion />
    </div>
  );
}

export default TreePage;
