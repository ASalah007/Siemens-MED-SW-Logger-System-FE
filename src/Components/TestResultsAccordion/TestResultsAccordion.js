import HAccordion from "./components/HAccordion.js";
import React from "react";
import { useTestResultsAccordionStates } from "./Hooks/TestResultsAccordionHook.js";

export default function TestResultsAccordion(props) {
  const {
    testSuitesCount,
    testSuitesPage,
    testSuitesRowsPerPage,
    handleTestSuitesPageChange,
    handleTestSuitesRowsPerPageChange,
    testSuiteLoading,
  } = props;

  const {
    firstColumnElements,
    firstHeaderOptions,

    secondColumnElements,
    secondHeaderOptions,

    thirdColumnElements,
    thirdHeaderOptions,

    fourthColumnElements,
    fourthHeaderOptions,

    activeTestSuite,
    activeTestCase,
    activeValidationTag,
    activeValidationPoint,
    validationTags,

    testCasesCount,
    testCasesPage,
    testCasesRowsPerPage,
    handleTestCasesPageChange,
    handleTestCasesRowsPerPageChange,

    validationTagsCount,
    validationTagsPage,
    validationTagsRowsPerPage,
    handleValidationTagsPageChange,
    handleValidationTagsRowsPerPageChange,

    validationPointsCount,
    validationPointsPage,
    validationPointsRowsPerPage,
    handleValidationPointsPageChange,
    handleValidationPointsRowsPerPageChange,

    testCaseLoading,
    validationTagsLoading,
    validationPointsLoading,
  } = useTestResultsAccordionStates(props);

  return (
    <div className="flex flex-col grow max-h-full">
      <HAccordion
        firstColumnElements={firstColumnElements}
        firstHeaderOptions={firstHeaderOptions}
        firstColumnPlaceHolder={
          "Test Suit " + (activeTestSuite >= 0 ? activeTestSuite : "")
        }
        firstColumnCount={testSuitesCount}
        firstColumnPage={testSuitesPage}
        firstColumnRowsPerPage={testSuitesRowsPerPage}
        firstColumnLoading={testSuiteLoading}
        onFirstColumnPageChange={handleTestSuitesPageChange}
        onFirstColumnRowsPerPageChange={handleTestSuitesRowsPerPageChange}
        secondColumnElements={secondColumnElements}
        secondHeaderOptions={secondHeaderOptions}
        secondColumnPlaceHolder={
          "Test Case " + (activeTestCase >= 0 ? activeTestCase : "")
        }
        secondColumnCount={testCasesCount}
        secondColumnPage={testCasesPage}
        secondColumnRowsPerPage={testCasesRowsPerPage}
        secondColumnLoading={testCaseLoading}
        onSecondColumnPageChange={handleTestCasesPageChange}
        onSecondColumnRowsPerPageChange={handleTestCasesRowsPerPageChange}
        thirdColumnElements={thirdColumnElements}
        thirdHeaderOptions={thirdHeaderOptions}
        thirdColumnPlaceHolder={
          activeValidationTag >= 0
            ? validationTags[activeValidationTag].metaData.name
            : "Validation Tag"
        }
        thirdColumnCount={validationTagsCount}
        thirdColumnPage={validationTagsPage}
        thirdColumnRowsPerPage={validationTagsRowsPerPage}
        thirdColumnLoading={validationTagsLoading}
        onThirdColumnPageChange={handleValidationTagsPageChange}
        onThirdColumnRowsPerPageChange={handleValidationTagsRowsPerPageChange}
        fourthColumnElements={fourthColumnElements}
        fourthHeaderOptions={fourthHeaderOptions}
        fourthColumnPlaceHolder={
          "Validation Point " +
          (activeValidationPoint >= 0 ? activeValidationPoint : "")
        }
        fourthColumnCount={validationPointsCount}
        fourthColumnPage={validationPointsPage}
        fourthColumnRowsPerPage={validationPointsRowsPerPage}
        fourthColumnLoading={validationPointsLoading}
        onFourthColumnPageChange={handleValidationPointsPageChange}
        onFourthColumnRowsPerPageChange={
          handleValidationPointsRowsPerPageChange
        }
      />
    </div>
  );
}
