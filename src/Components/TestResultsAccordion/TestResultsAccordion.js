import HAccordion from "./components/HAccordion.js";
import React from "react";
import { useTestResultsAccordionStates } from "./Hooks/TestResultsAccordionHook.js";

export default function TestResultsAccordion(props) {
  const s = useTestResultsAccordionStates(props);

  return (
    <div className="flex flex-col grow max-h-full">
      <HAccordion
        firstColumnElements={s.firstColumnElements}
        firstHeaderOptions={s.firstHeaderOptions}
        firstColumnPlaceHolder={
          "Test Suit " +
          (s.activeTestSuite >= 0
            ? s.testSuites[s.activeTestSuite].incrementalId
            : "")
        }
        firstColumnCount={s.testSuitesCount}
        firstColumnPage={s.testSuitesPage}
        firstColumnRowsPerPage={s.testSuitesRowsPerPage}
        firstColumnLoading={s.testSuiteLoading}
        onFirstColumnPageChange={s.handleTestSuitesPageChange}
        onFirstColumnRowsPerPageChange={s.handleTestSuitesRowsPerPageChange}
        secondColumnElements={s.secondColumnElements}
        secondHeaderOptions={s.secondHeaderOptions}
        secondColumnPlaceHolder={
          "Test Case " +
          (s.activeTestCase >= 0
            ? s.testCases[s.activeTestCase].incrementalId
            : "")
        }
        secondColumnCount={s.testCasesCount}
        secondColumnPage={s.testCasesPage}
        secondColumnRowsPerPage={s.testCasesRowsPerPage}
        secondColumnLoading={s.testCaseLoading}
        onSecondColumnPageChange={s.handleTestCasesPageChange}
        onSecondColumnRowsPerPageChange={s.handleTestCasesRowsPerPageChange}
        thirdColumnElements={s.thirdColumnElements}
        thirdHeaderOptions={s.thirdHeaderOptions}
        thirdColumnPlaceHolder={
          s.activeValidationTag >= 0
            ? s.validationTags[s.activeValidationTag].metaData.name
            : "Validation Tag"
        }
        thirdColumnCount={s.validationTagsCount}
        thirdColumnPage={s.validationTagsPage}
        thirdColumnRowsPerPage={s.validationTagsRowsPerPage}
        thirdColumnLoading={s.validationTagsLoading}
        onThirdColumnPageChange={s.handleValidationTagsPageChange}
        onThirdColumnRowsPerPageChange={s.handleValidationTagsRowsPerPageChange}
        fourthColumnElements={s.fourthColumnElements}
        fourthHeaderOptions={s.fourthHeaderOptions}
        fourthColumnPlaceHolder={
          "Validation Point " +
          (s.activeValidationPoint >= 0
            ? s.validationPoints[s.activeValidationPoint].incrementalId
            : "")
        }
        fourthColumnCount={s.validationPointsCount}
        fourthColumnPage={s.validationPointsPage}
        fourthColumnRowsPerPage={s.validationPointsRowsPerPage}
        fourthColumnLoading={s.validationPointsLoading}
        onFourthColumnPageChange={s.handleValidationPointsPageChange}
        onFourthColumnRowsPerPageChange={
          s.handleValidationPointsRowsPerPageChange
        }
      />
    </div>
  );
}
