import React from "react";
import HAccordion from "../TestResultsAccordion/components/HAccordion";

function SearchResultsAccordion() {
  const firstHeaderOptions = {
    failed: 0,
    total: 0,
    title: "Test Suites",
  };
  const secondHeaderOptions = {
    failed: 0,
    total: 0,
    title: "Test Cases",
  };
  const thirdHeaderOptions = {
    failed: 0,
    total: 0,
    title: "Validation Tags",
  };
  const fourthHeaderOptions = {
    failed: 0,
    total: 0,
    title: "Validation Points",
  };
  return (
    <HAccordion
      firstHeaderOptions={firstHeaderOptions}
      secondHeaderOptions={secondHeaderOptions}
      thirdHeaderOptions={thirdHeaderOptions}
      fourthHeaderOptions={fourthHeaderOptions}
    />
  );
}

export default SearchResultsAccordion;
