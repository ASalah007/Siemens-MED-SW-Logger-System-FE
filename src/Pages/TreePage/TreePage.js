import React, { useEffect, useState } from "react";
import TestResultsAccordion from "../../Components/TestResultsAccordion/TestResultsAccordion.js";
import { CircularProgress } from "@mui/material";
import { fetchTestSuites } from "../../Services/services.js";
import Nav from "../../Components/Navbar/Nav.js";
import { useTestResultsEntryState } from "../../Components/TestResultsAccordion/Hooks/TestResultsEntryHook.js";

function TreePage() {
  const [
    testSuites,
    setTestSuites,
    activeTestSuite,
    setActiveTestSuite,
    testSuitesFilter,
    setTestSuitesFilter,
    testSuitesTableView,
    setTestSuitesTableView,
    testSuitesPage,
    setTestSuitesPage,
    testSuitesRowsPerPage,
    setTestSuitesRowsPerPage,
    testSuiteLoading,
    setTestSuiteLoading,
    handleTestSuitesPageChange,
    handleTestSuitesRowsPerPageChange,
  ] = useTestResultsEntryState();

  useEffect(() => {
    setTestSuiteLoading(true);
    fetchTestSuites(
      testSuitesRowsPerPage,
      testSuitesPage + 1,
      testSuitesFilter
    ).then((data) => {
      setTestSuites(data);
      setTestSuiteLoading(false);
    });
  }, [
    testSuitesRowsPerPage,
    testSuitesPage,
    testSuitesFilter,
    setTestSuiteLoading,
    setTestSuites,
  ]);

  return (
    <div className="bg-white flex flex-col grow h-screen overflow-hidden">
      <Nav />
      <TestResultsAccordion
        testSuites={testSuites}
        testSuitesCount={100}
        setTestSuites={setTestSuites}
        activeTestSuite={activeTestSuite}
        setActiveTestSuite={setActiveTestSuite}
        testSuitesFilter={testSuitesFilter}
        setTestSuitesFilter={setTestSuitesFilter}
        testSuitesTableView={testSuitesTableView}
        setTestSuitesTableView={setTestSuitesTableView}
        testSuitesPage={testSuitesPage}
        setTestSuitesPage={setTestSuitesPage}
        testSuitesRowsPerPage={testSuitesRowsPerPage}
        setTestSuitesRowsPerPage={setTestSuitesRowsPerPage}
        testSuiteLoading={testSuiteLoading}
        setTestSuiteLoading={setTestSuiteLoading}
        handleTestSuitesPageChange={handleTestSuitesPageChange}
        handleTestSuitesRowsPerPageChange={handleTestSuitesRowsPerPageChange}
      />
    </div>
  );
}

export default TreePage;
