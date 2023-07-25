import { useEffect } from "react";
import {
  fetchStatistics,
  fetchTestCases,
  fetchTestSuites,
  fetchValidationPoints,
  fetchValidationTags,
} from "../../../Services/services.js";
import useAccordionStates from "./AccordionHook.js";

export function useTestResultsAccordionStates() {
  const states = useAccordionStates({});
  const {
    reset,
    testSuitesRowsPerPage,
    testSuitesPage,
    testSuitesFilter,
    setTestSuiteLoading,
    setTestSuites,
    activeTestSuite,
    testCasesRowsPerPage,
    testCasesPage,
    testSuites,
    testCasesFilter,
    activeValidationTag,
    validationTags,
    validationPointsRowsPerPage,
    validationPointsPage,
    validationPointsFilter,
    setTestSuitesStatistics,
    setTestCaseLoading,
    setTestCases,
    activeTestCase,
    testCases,
    validationTagsRowsPerPage,
    validationTagsPage,
    setValidationTags,
    setValidationTagsLoading,
    validationTagsFilter,
    setValidationPoints,
    setValidationPointsLoading,
    setActiveTestCase,
    setActiveValidationTag,
    setActiveValidationPoint,

    setTestSuitesCount,
    setTestCasesCount,
    setValidationTagsCount,
    setValidationPointsCount,
    testSuitesStatistics,
  } = states;

  useEffect(() => {
    console.log(testSuitesFilter);
    setTestSuiteLoading(true);
    fetchTestSuites(
      testSuitesRowsPerPage,
      testSuitesPage + 1,
      testSuitesFilter
    ).then((data) => {
      setTestSuites(data.testSuites);
      setTestSuiteLoading(false);
    });
  }, [
    testSuitesRowsPerPage,
    testSuitesPage,
    testSuitesFilter,
    setTestSuiteLoading,
    setTestSuites,
  ]);

  useEffect(() => {
    fetchStatistics().then((data) => {
      setTestSuitesStatistics(data.testSuite);
    });
  }, []);

  useEffect(() => {
    let testSuitesCount =
      testSuitesFilter === "any"
        ? testSuitesStatistics.total
        : testSuitesFilter === "passed"
        ? testSuitesStatistics.passed
        : testSuitesStatistics.failed;
    testSuitesCount = testSuitesCount || 0;
    setTestSuitesCount(testSuitesCount);
  }, [setTestSuitesCount, testSuitesFilter, testSuitesStatistics]);

  useEffect(() => {
    if (activeTestSuite < 0) {
      reset("TC");
      return;
    }
    setActiveTestCase(-1);
    setTestCaseLoading(true);
    fetchTestCases(
      testSuites[activeTestSuite]._id,
      testCasesRowsPerPage,
      testCasesPage + 1,
      testCasesFilter
    ).then((data) => {
      setTestCases(data);
      setTestCaseLoading(false);
    });
  }, [
    activeTestSuite,
    testCasesRowsPerPage,
    testCasesPage,
    testSuites,
    testCasesFilter,
  ]);

  useEffect(() => {
    let TCCount = getCount(
      testSuites,
      activeTestSuite,
      testCasesFilter,
      "failedTestCasesCount",
      "passedTestCasesCount",
      "TestCasesCount"
    );
    setTestCasesCount(TCCount);
  }, [activeTestSuite, setTestCasesCount, testCasesFilter, testSuites]);

  useEffect(() => {
    if (activeTestCase < 0) {
      reset("VT");
      return;
    }
    setValidationTagsLoading(true);
    setActiveValidationTag(-1);
    fetchValidationTags(
      testCases[activeTestCase]._id,
      validationTagsRowsPerPage,
      validationTagsPage + 1,
      validationTagsFilter
    ).then((data) => {
      setValidationTags(data);
      setValidationTagsLoading(false);
    });
  }, [
    activeTestCase,
    testCases,
    validationTagsRowsPerPage,
    validationTagsPage,
    testCasesFilter,
    validationTagsFilter,
  ]);

  useEffect(() => {
    let VTCount = getCount(
      testCases,
      activeTestCase,
      validationTagsFilter,
      "failedValidationTagsCount",
      "passedValidationTagsCount",
      "ValidationTagsCount"
    );
    setValidationTagsCount(VTCount);
  }, [activeTestCase, setValidationTagsCount, testCases, validationTagsFilter]);

  useEffect(() => {
    if (activeValidationTag < 0) {
      reset("VP");
      return;
    }
    setValidationPointsLoading(true);
    setActiveValidationPoint(-1);
    fetchValidationPoints(
      validationTags[activeValidationTag]._id,
      validationPointsRowsPerPage,
      validationPointsPage + 1,
      validationPointsFilter
    ).then((data) => {
      setValidationPoints(data);
      setValidationPointsLoading(false);
    });
  }, [
    activeValidationTag,
    validationTags,
    validationPointsRowsPerPage,
    validationPointsPage,
    validationPointsFilter,
  ]);

  useEffect(() => {
    let VPCount = getCount(
      validationTags,
      activeValidationTag,
      validationPointsFilter,
      "failedValidationPointsCount",
      "passedValidationPointsCount",
      "ValidationPointsCount"
    );
    setValidationPointsCount(VPCount);
  }, [
    activeValidationTag,
    setValidationPointsCount,
    validationPointsFilter,
    validationTags,
  ]);

  return states;
}

export function getCount(data, active, filter, failed, passed, total) {
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
        count = data[active][total];
    }
  }
  return count;
}
