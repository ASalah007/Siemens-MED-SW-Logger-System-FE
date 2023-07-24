import React from "react";
import HAccordion from "../TestResultsAccordion/components/HAccordion";
import useSearchResultsAccordionStates from "./Hooks/SearchResultsAccordionHook";

function SearchResultsAccordion(props) {
  const states = useSearchResultsAccordionStates(props);

  return (
    <HAccordion
      {...states}
      firstColumnPlaceHolder="Test Suites"
      secondColumnPlaceHolder="Test Cases"
      thirdColumnPlaceHolder="Validation Tags"
      fourthColumnPlaceHolder="Validation Points"
    />
  );
}

export default SearchResultsAccordion;
