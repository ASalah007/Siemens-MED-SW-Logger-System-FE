import { useEffect } from "react";
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

    setTestSuitesCount,
    setTestCasesCount,
    setValidationTagsCount,
    setValidationPointsCount,
  } = states;

  useEffect(() => {
    fetchStatistics().then((data) => setTestSuitesStatistics(data.testSuite));
  }, [setTestSuitesStatistics]);

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
      setTestSuitesCount(data.resultsLength); //TODO total count not pagged count
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
      setTestCasesCount(data.resultsLength); // TODO this should be the total count not pagged check with awam
    });
  }, [
    returnResult,
    activeTestSuite,
    testCasesRowsPerPage,
    testCasesPage,
    testCasesFilter,
    filterValues,
    setActiveValidationTag,
    setTestCases,
  ]);

  useEffect(() => {
    if (activeTestCase !== -1 && returnResult === "testCase") {
      setTestSuites([testCases[activeTestCase].parent.testSuite]);
      setTestSuitesCount(1);
    }
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
    }).then((data) => {
      setValidationTags(data.results);
      setValidationTagsCount(data.resultsLength); // TODO total count not pagged count
    });
  }, [
    activeTestCase,
    filterValues,
    returnResult,
    setActiveValidationPoint,
    setValidationTags,
    validationTagsFilter,
    validationTagsPage,
    validationTagsRowsPerPage,
  ]);

  useEffect(() => {
    if (activeValidationTag !== -1 && returnResult === "validationTag") {
      setTestSuites([validationTags[activeValidationTag].parent.testSuite]);
      setTestCases([validationTags[activeValidationTag].parent.testCase]);
      setTestSuitesCount(1);
      setTestCasesCount(1);
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
    }).then((data) => {
      setValidationPoints(data.results);
      setValidationPointsCount(data.resultsLength); // TODO same here
    });
  }, [
    activeValidationTag,
    filterValues,
    returnResult,
    setValidationPoints,
    validationPointsFilter,
    validationPointsPage,
    validationPointsRowsPerPage,
  ]);

  useEffect(() => {
    if (activeValidationPoint !== -1 && returnResult === "validationPoint") {
      setTestSuites([validationPoints[activeValidationPoint].parent.testSuite]);
      setTestCases([validationPoints[activeValidationPoint].parent.testCase]);
      setValidationTags([
        validationPoints[activeValidationPoint].parent.validationTag,
      ]);
      setTestSuitesCount(1);
      setTestCasesCount(1);
      setValidationTagsCount(1);
    }
  }, [activeValidationPoint]);

  return states;
}
