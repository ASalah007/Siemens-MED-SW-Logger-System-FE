import { useEffect } from "react";
import useAccordionStates from "../../TestResultsAccordion/Hooks/AccordionHook";
import { fetchSearch, fetchStatistics } from "../../../Services/services";

export default function useSearchResultsAccordionStates({
  returnResult,
  filterValues,
  searched,
}) {
  const s = useAccordionStates({ nostats: true, nofilter: true });

  useEffect(() => {
    fetchStatistics().then((data) => s.setTestSuitesStatistics(data.testSuite));
  }, [s.setTestSuitesStatistics]);

  useEffect(() => {
    if (returnResult !== "testSuite") return;
    s.setTestSuiteLoading(true);

    s.setActiveTestCase(-1);
    s.setActiveTestSuite(-1);
    fetchSearch({
      returnResult,
      ...filterValues,
      limit: s.testSuitesRowsPerPage,
      page: s.testSuitesPage + 1,
      status: s.testSuitesFilter,
    }).then((data) => {
      s.setTestSuites(data.results);
      s.setTestSuiteLoading(false);
      s.setTestSuitesCount(data.resultsLength); //TODO total count not pagged count
    });
  }, [
    s.testSuitesRowsPerPage,
    s.testSuitesPage,
    s.testSuitesFilter,
    s.setTestSuiteLoading,
    s.setTestSuites,
    returnResult,
    s.setActiveTestCase,
    searched,
  ]);

  // test cases effects
  useEffect(() => {
    if (returnResult === "validationPoint" || returnResult === "validationTag")
      return;
    if (returnResult !== "testCase" && s.activeTestSuite < 0) return;

    const testSuiteId =
      returnResult !== "testCase" && s.activeTestSuite > -1
        ? s.testSuites[s.activeTestSuite]._id
        : "";
    // const page = s.testCasesPage;
    s.reset("TC", true);
    s.setTestCaseLoading(true);
    fetchSearch({
      returnResult: "testCase",
      ...filterValues,
      testSuiteId,
      limit: s.testCasesRowsPerPage,
      page: s.testCasesPage + 1,
      status: s.testCasesFilter,
    }).then((data) => {
      s.setTestCases(data.results);
      s.setTestCasesCount(data.resultsLength); // TODO this should be the total count not pagged check with awam
      s.setTestCaseLoading(false);
      console.log(data);
    });
  }, [
    returnResult,
    s.activeTestSuite,
    s.testCasesRowsPerPage,
    s.testCasesPage,
    s.testCasesFilter,
    s.setActiveValidationTag,
    s.setTestCases,
    searched,
  ]);

  useEffect(() => {
    if (s.activeTestCase !== -1 && returnResult === "testCase") {
      s.setTestSuites([s.testCases[s.activeTestCase].parent.testSuite]);
      s.setTestSuitesCount(1);
    }
  }, [s.activeTestCase]);

  // validation tag effects
  useEffect(() => {
    if (returnResult === "validationPoint") return;
    if (returnResult !== "validationTag" && s.activeTestCase < 0) return;

    const testCaseId =
      returnResult !== "validationTag" && s.activeTestCase > -1
        ? s.testCases[s.activeTestCase]._id
        : "";

    s.reset("VT", true);
    s.setValidationTagsLoading(true);
    fetchSearch({
      returnResult: "validationTag",
      ...filterValues,
      testCaseId,
      limit: s.validationTagsRowsPerPage,
      page: s.validationTagsPage + 1,
      // status: s.validationTagsFilter,
    }).then((data) => {
      s.setValidationTags(data.results);
      s.setValidationTagsCount(data.resultsLength); // TODO total count not pagged count
      s.setValidationTagsLoading(false);
    });
  }, [
    s.activeTestCase,
    returnResult,
    s.setActiveValidationPoint,
    s.setValidationTags,
    s.validationTagsFilter,
    s.validationTagsPage,
    s.validationTagsRowsPerPage,
    searched,
  ]);

  useEffect(() => {
    if (s.activeValidationTag !== -1 && returnResult === "validationTag") {
      s.setTestSuites([
        s.validationTags[s.activeValidationTag].parent.testSuite,
      ]);
      s.setTestCases([s.validationTags[s.activeValidationTag].parent.testCase]);
      s.setTestSuitesCount(1);
      s.setTestCasesCount(1);
    }
  }, [s.activeValidationTag]);

  // validation point effects
  useEffect(() => {
    if (returnResult !== "validationPoint" && s.activeValidationTag < 0) return;

    const validationTagId =
      returnResult !== "validationPoint" && s.activeValidationTag > -1
        ? s.validationTags[s.activeValidationTag]._id
        : "";

    s.reset("VP", true);
    s.setValidationPointsLoading(true);
    fetchSearch({
      returnResult: "validationPoint",
      ...filterValues,
      validationTagId,
      limit: s.validationPointsRowsPerPage,
      page: s.validationPointsPage + 1,
      status: s.validationPointsFilter,
    }).then((data) => {
      s.setValidationPoints(data.results);
      s.setValidationPointsCount(data.resultsLength); // TODO same here
      s.setValidationPointsLoading(false);
    });
  }, [
    s.activeValidationTag,
    returnResult,
    s.setValidationPoints,
    s.validationPointsFilter,
    s.validationPointsPage,
    s.validationPointsRowsPerPage,
    searched,
  ]);

  useEffect(() => {
    if (s.activeValidationPoint !== -1 && returnResult === "validationPoint") {
      s.setTestSuites([
        s.validationPoints[s.activeValidationPoint].parent.testSuite,
      ]);
      s.setTestCases([
        s.validationPoints[s.activeValidationPoint].parent.testCase,
      ]);
      s.setValidationTags([
        s.validationPoints[s.activeValidationPoint].parent.validationTag,
      ]);
      s.setTestSuitesCount(1);
      s.setTestCasesCount(1);
      s.setValidationTagsCount(1);
    }
  }, [s.activeValidationPoint]);

  return s;
}
