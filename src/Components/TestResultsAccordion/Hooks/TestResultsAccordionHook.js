import { useEffect } from "react";
import {
  fetchStatistics,
  fetchTestCases,
  fetchTestSuites,
  fetchValidationPoints,
  fetchValidationTags,
} from "../../../Services/authServices";
import useAccordionStates from "./AccordionHook.js";

export function useTestResultsAccordionStates() {
  const s = useAccordionStates({});

  useEffect(() => {
    s.setTestSuiteLoading(true);
    fetchTestSuites(
      s.testSuitesRowsPerPage,
      s.testSuitesPage + 1,
      s.testSuitesFilter
    ).then((data) => {
      s.setTestSuites(data.testSuites);
      s.setTestSuiteLoading(false);
    });
  }, [
    s.testSuitesRowsPerPage,
    s.testSuitesPage,
    s.testSuitesFilter,
    s.setTestSuiteLoading,
    s.setTestSuites,
  ]);

  useEffect(() => {
    fetchStatistics().then((data) => {
      s.setTestSuitesStatistics(data.testSuite);
    });
  }, []);

  useEffect(() => {
    let testSuitesCount =
      s.testSuitesFilter === "any"
        ? s.testSuitesStatistics.total
        : s.testSuitesFilter === "passed"
        ? s.testSuitesStatistics.passed
        : s.testSuitesStatistics.failed;
    testSuitesCount = testSuitesCount || 0;
    s.setTestSuitesCount(testSuitesCount);
  }, [s.setTestSuitesCount, s.testSuitesFilter, s.testSuitesStatistics]);

  useEffect(() => {
    if (s.activeTestSuite < 0) {
      s.reset("TC");
      return;
    }
    s.setActiveTestCase(-1);
    s.setTestCaseLoading(true);
    fetchTestCases(
      s.testSuites[s.activeTestSuite]._id,
      s.testCasesRowsPerPage,
      s.testCasesPage + 1,
      s.testCasesFilter
    ).then((data) => {
      s.setTestCases(data);
      s.setTestCaseLoading(false);
    });
  }, [
    s.activeTestSuite,
    s.testCasesRowsPerPage,
    s.testCasesPage,
    s.testSuites,
    s.testCasesFilter,
  ]);

  useEffect(() => {
    let TCCount = getCount(
      s.testSuites,
      s.activeTestSuite,
      s.testCasesFilter,
      "failedTestCasesCount",
      "passedTestCasesCount",
    );
    s.setTestCasesCount(TCCount);
  }, [s.activeTestSuite, s.setTestCasesCount, s.testCasesFilter, s.testSuites]);

  useEffect(() => {
    if (s.activeTestCase < 0) {
      s.reset("VT");
      return;
    }
    s.setValidationTagsLoading(true);
    s.setActiveValidationTag(-1);
    fetchValidationTags(
      s.testCases[s.activeTestCase]._id,
      s.validationTagsRowsPerPage,
      s.validationTagsPage + 1,
      s.validationTagsFilter
    ).then((data) => {
      s.setValidationTags(data);
      s.setValidationTagsLoading(false);
    });
  }, [
    s.activeTestCase,
    s.testCases,
    s.validationTagsRowsPerPage,
    s.validationTagsPage,
    s.testCasesFilter,
    s.validationTagsFilter,
  ]);

  useEffect(() => {
    let VTCount = getCount(
      s.testCases,
      s.activeTestCase,
      s.validationTagsFilter,
      "failedValidationTagsCount",
      "passedValidationTagsCount",
    );
    s.setValidationTagsCount(VTCount);
  }, [
    s.activeTestCase,
    s.setValidationTagsCount,
    s.testCases,
    s.validationTagsFilter,
  ]);

  useEffect(() => {
    if (s.activeValidationTag < 0) {
      s.reset("VP");
      return;
    }
    s.setValidationPointsLoading(true);
    s.setActiveValidationPoint(-1);
    fetchValidationPoints(
      s.validationTags[s.activeValidationTag]._id,
      s.validationPointsRowsPerPage,
      s.validationPointsPage + 1,
      s.validationPointsFilter
    ).then((data) => {
      s.setValidationPoints(data);
      s.setValidationPointsLoading(false);
    });
  }, [
    s.activeValidationTag,
    s.validationTags,
    s.validationPointsRowsPerPage,
    s.validationPointsPage,
    s.validationPointsFilter,
  ]);

  useEffect(() => {
    let VPCount = getCount(
      s.validationTags,
      s.activeValidationTag,
      s.validationPointsFilter,
      "failedValidationPointsCount",
      "passedValidationPointsCount",
    );
    s.setValidationPointsCount(VPCount);
  }, [
    s.activeValidationTag,
    s.setValidationPointsCount,
    s.validationPointsFilter,
    s.validationTags,
  ]);

  return s;
}

export function getCount(data, active, filter, failed, passed) {
  let count = 0;
  if (active > -1) {
    switch (filter) {
      case "failed":
        count = data[active][failed];
        break;

      case "passed":
        count = data[active][passed];
        break;

      default:
        count = data[active][failed] + data[active][passed];
    }
  }
  return count;
}
