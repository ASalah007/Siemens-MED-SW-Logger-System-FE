import React from "react";
import HAccordion from "../TestResultsAccordion/components/HAccordion";
import useSearchResultsAccordionStates from "./Hooks/SearchResultsAccordionHook";

function SearchResultsAccordion(props) {
  const s = useSearchResultsAccordionStates(props);

  return (
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
      nostats
      paginationFreeMode
    />
  );
}

export default SearchResultsAccordion;
