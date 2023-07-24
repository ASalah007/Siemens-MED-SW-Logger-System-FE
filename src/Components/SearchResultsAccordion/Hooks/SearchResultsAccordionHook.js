import React, { useEffect } from "react";
import useAccordionStates from "../../TestResultsAccordion/Hooks/AccordionHook";
import { fetchSearch, fetchStatistics } from "../../../Services/services";

export default function useSearchResultsAccordionStates({
  returnResult,
  filterValues,
}) {
  const states = useAccordionStates({ nostats: true, nofilter: true });
  const {
    testSuites,
    setTestSuites,
    testCases,
    setTestCases,
    validationTags,
    setValidationTags,
    setValidationPoints,
    setTestSuitesStatistics,

    reset,
    testSuitesRowsPerPage,
    testSuitesPage,
    testSuitesFilter,
    setTestSuiteLoading,
    activeTestSuite,
    testCasesRowsPerPage,
    testCasesPage,
    testCasesFilter,
    activeValidationTag,
    validationPointsRowsPerPage,
    validationPointsPage,
    validationPointsFilter,
    setTestCaseLoading,
    activeTestCase,
    validationTagsRowsPerPage,
    validationTagsPage,
    setValidationTagsLoading,
    validationTagsFilter,
    setValidationPointsLoading,
    validationPoints,
    activeValidationPoint,
    setActiveTestCase,
    setActiveValidationTag,
    setActiveValidationPoint,
  } = states;

  useEffect(() => {
    fetchStatistics().then((data) => setTestSuitesStatistics(data.testSuite));
  }, [setTestSuitesStatistics]);

  //   useEffect(() => {
  //     switch (returnResult) {
  //       case "testSuite":
  //         setTestSuites(data);
  //         break;
  //       case "testCase":
  //         setTestCases(data);
  //         break;
  //       case "validationTag":
  //         setValidationTags(data);
  //         break;
  //       case "validationPoint":
  //         setValidationPoints(data);
  //         break;
  //       default:
  //         break;
  //     }
  //   }, [
  //     returnResult,
  //     data,
  //     setTestSuites,
  //     setTestCases,
  //     setValidationTags,
  //     setValidationPoints,
  //   ]);

  useEffect(() => {
    if (returnResult !== "testSuite") return;
    setTestSuiteLoading(true);

    setActiveTestCase(-1);
    fetchSearch({
      returnResult,
      ...filterValues,
      limit: testSuitesRowsPerPage,
      page: testSuitesPage + 1,
      status: testSuitesFilter,
    }).then((data) => {
      setTestSuites(data.results);
      setTestSuiteLoading(false);
      //   states.testSuitesCount = data.resultsLength;
    });
  }, [
    testSuitesRowsPerPage,
    testSuitesPage,
    testSuitesFilter,
    setTestSuiteLoading,
    setTestSuites,
    returnResult,
    filterValues,
    setActiveTestCase,
  ]);

  // test cases effects
  useEffect(() => {
    if (returnResult === "validationPoint" || returnResult === "validationTag")
      return;
    if (returnResult !== "testCase" && activeTestSuite < 0) return;

    const testSuiteId =
      returnResult !== "testCase" && activeTestSuite > -1
        ? testSuites[activeTestSuite]._id
        : "";
    reset("TC");
    fetchSearch({
      returnResult: "testCase",
      ...filterValues,
      testSuiteId,
      limit: testCasesRowsPerPage,
      page: testCasesPage + 1,
      status: testCasesFilter,
    }).then((data) => {
      setTestCases(data.results);
      //   states.testCasesCount = data.resultsLength;
    });
  }, [
    returnResult,
    activeTestSuite,
    testCasesRowsPerPage,
    testCasesPage,
    testCasesFilter,
    testSuites,
    filterValues,
    setActiveValidationTag,
    setTestCases,
  ]);

  useEffect(() => {
    if (activeTestCase !== -1 && returnResult === "testCase")
      setTestSuites([testCases[activeTestCase].parent.testSuite]);
  }, [activeTestCase]);

  // validation tag effects
  useEffect(() => {
    if (returnResult === "validationPoint") return;
    if (returnResult !== "validationTag" && activeTestCase < 0) return;

    const testCaseId =
      returnResult !== "validationTag" && activeTestCase > -1
        ? testCases[activeTestCase]._id
        : "";

    reset("VT");
    fetchSearch({
      returnResult: "validationTag",
      ...filterValues,
      testCaseId,
      limit: validationTagsRowsPerPage,
      page: validationTagsPage + 1,
      status: validationTagsFilter,
    }).then((data) => setValidationTags(data.results));
  }, [
    activeTestCase,
    filterValues,
    returnResult,
    setActiveValidationPoint,
    setValidationTags,
    testCases,
    validationTagsFilter,
    validationTagsPage,
    validationTagsRowsPerPage,
  ]);

  useEffect(() => {
    if (activeValidationTag !== -1 && returnResult === "validationTag") {
      setTestSuites([validationTags[activeValidationTag].parent.testSuite]);
      setTestCases([validationTags[activeValidationTag].parent.testCase]);
    }
  }, [activeValidationTag]);

  // validation point effects
  useEffect(() => {
    if (returnResult !== "validationPoint" && activeValidationTag < 0) return;

    const validationTagId =
      returnResult !== "validationPoint" && activeValidationTag > -1
        ? validationTags[activeValidationTag]._id
        : "";

    reset("VP");
    fetchSearch({
      returnResult: "validationPoint",
      ...filterValues,
      validationTagId,
      limit: validationPointsRowsPerPage,
      page: validationPointsPage + 1,
      status: validationPointsFilter,
    }).then((data) => setValidationPoints(data.results));
  }, [
    activeValidationTag,
    filterValues,
    returnResult,
    setValidationPoints,
    validationPointsFilter,
    validationPointsPage,
    validationPointsRowsPerPage,
    validationTags,
  ]);

  useEffect(() => {
    if (activeValidationPoint !== -1 && returnResult === "validationPoint") {
      setTestSuites([validationPoints[activeValidationPoint].parent.testSuite]);
      setTestCases([validationPoints[activeValidationPoint].parent.testCase]);
      setValidationTags([
        validationPoints[activeValidationPoint].parent.validationTag,
      ]);
    }
  }, [activeValidationPoint]);

  return states;
}
