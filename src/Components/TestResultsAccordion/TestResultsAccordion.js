import React, { useState } from "react";
import HAccordion from "./components/HAccordion.js";
import TSEntry from "./components/TSEntry.js";
import TCEntry from "./components/TCEntry.js";
import VTEntry from "./components/VTEntry.js";
import VPEntry from "./components/VPEntry.js";
import ShowInTable from "../ShowInTable/ShowInTable.js";
import { formatDuration } from "../../Utils/utilities.js";
import {
  fetchTestCases,
  fetchValidationPoints,
  fetchValidationTags,
} from "../../Services/services.js";
import ShowFilter from "../ShowFilter/ShowFilter.js";

function TestResultsAccordion({ testSuites }) {
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
    testSuitesCount,
    testSuitesPage,
    testSuitesRowsPerPage,
    handleTestSuitesPageChange,
    handleTestSuitesRowsPerPageChange,
  } = useTestResultsAccordionStates({ testSuites });

  return (
    <div className="flex flex-col grow">
      <HAccordion
        firstColumnElements={firstColumnElements}
        firstHeaderOptions={firstHeaderOptions}
        firstColumnPlaceHolder={
          "Test Suit " + (activeTestSuite >= 0 ? activeTestSuite : "")
        }
        firstColumnCount={testSuitesCount}
        firstColumnPage={testSuitesPage}
        firstColumnRowsPerPage={testSuitesRowsPerPage}
        onFirstColumnPageChange={handleTestSuitesPageChange}
        onFirstColumnRowsPerPageChange={handleTestSuitesRowsPerPageChange}
        secondColumnElements={secondColumnElements}
        secondHeaderOptions={secondHeaderOptions}
        secondColumnPlaceHolder={
          "Test Case " + (activeTestCase >= 0 ? activeTestCase : "")
        }
        thirdColumnElements={thirdColumnElements}
        thirdHeaderOptions={thirdHeaderOptions}
        thirdColumnPlaceHolder={
          activeValidationTag >= 0
            ? validationTags[activeValidationTag].metaData.name
            : "Validation Tag"
        }
        fourthColumnElements={fourthColumnElements}
        fourthHeaderOptions={fourthHeaderOptions}
        fourthColumnPlaceHolder={
          "Validation Point " +
          (activeValidationPoint >= 0 ? activeValidationPoint : "")
        }
      />
    </div>
  );
}

function useTestResultsAccordionStates({ testSuites }) {
  const [testCases, setTestCases] = useState([]);
  const [validationTags, setValidationTags] = useState([]);
  const [validationPoints, setValidationPoints] = useState([]);

  const [activeTestSuite, setActiveTestSuite] = useState(-1);
  const [activeTestCase, setActiveTestCase] = useState(-1);
  const [activeValidationTag, setActiveValidationTag] = useState(-1);
  const [activeValidationPoint, setActiveValidationPoint] = useState(-1);

  const [filterTestSuite, setFilterTestSuite] = useState("any");
  const [filterTestCase, setFilterTestCase] = useState("any");
  const [filterValidationTag, setFilterValidationTag] = useState("any");
  const [filterValidationPoint, setFilterValidationPoint] = useState("any");

  const [testSuitesTableView, setTestSuitesTableView] = useState(false);
  const [testCasesTableView, setTestCasesTableView] = useState(false);
  const [validationTagsTableView, setValidationTagsTableView] = useState(false);
  const [validationPointsTableView, setValidationPointsTableView] =
    useState(false);

  const [testSuitesSelectedFilters, setTestSuitesSelectedFilters] = useState(
    []
  );

  const [testSuitesPage, setTestSuitesPage] = useState(0);
  const [testSuitesRowsPerPage, setTestSuitesRowsPerPage] = useState(10);
  const handleTestSuitesPageChange = (newPage) => setTestSuitesPage(newPage);
  const handleTestSuitesRowsPerPageChange = (newRows) =>
    setTestSuitesRowsPerPage(newRows);
  function paginate(arr, page, rowsPerPage) {
    return arr.filter(
      (e, i) => i >= page * rowsPerPage && i < page * rowsPerPage + rowsPerPage
    );
  }

  function loadTestCases(testSuiteId) {
    fetchTestCases(testSuiteId).then((data) => setTestCases(data));
  }

  function loadValidationTags(testCaseId) {
    fetchValidationTags(testCaseId).then((data) => setValidationTags(data));
  }

  function loadValidationPoints(validationTagId) {
    fetchValidationPoints(validationTagId).then((data) =>
      setValidationPoints(data)
    );
  }

  const TSColumns = ["id", "status", "duration"].concat(
    testSuites.length > 0 &&
      Object.keys(testSuites[0].metaData).filter((k) => k !== "design_info")
  );

  const TSData = testSuites.map((e, i) => [
    i,
    String(e.status),
    formatDuration(new Date(e.end_date) - new Date(e.creation_date)),
    ...Object.entries(e.metaData)
      .filter(([k, v]) => k !== "design_info")
      .flatMap(([k, v]) => v),
  ]);

  function applyFilters(arr, filters, data) {
    if (filters.length === 0) return [...arr];
    const f = data.map((e) =>
      e.reduce(
        (acc, ele, i) =>
          (filters[i].length === 0 || filters[i].includes(ele)) && acc,
        true
      )
    );
    return arr.filter((e, i) => f[i]);
  }
  const filterTestSuites = (arr) =>
    applyFilters(arr, testSuitesSelectedFilters, TSData);

  const TCColumns = ["id", "status", "duration", "failed VTs"];
  const TCData = testCases.map((e, i) => [
    i,
    String(e.status),
    formatDuration(new Date(e.end_date) - new Date(e.creation_date)),
    `x/${e.validationTags_count}`,
  ]);

  const VTColumns = [
    "name",
    "status",
    "duration",
    "failed VPs",
    "descrition",
    "executable Path",
  ];
  const VTData = validationTags.map((e) => [
    e.metaData.name,
    String(e.status),
    formatDuration(new Date(e.end_date) - new Date(e.creation_date)),
    `x/${e.validationPoints_count}`,
    e.metaData.metaData.Description,
    e.metaData.metaData["Executable Path"],
  ]);

  const VPColumns = ["id", "status", "mac", "direction", "failed results"];
  const VPData = validationPoints.map((e, i) => [
    i,
    String(e.status),
    e.levels.mac,
    e.levels.direction,
    `x/${e.results.length}`,
  ]);

  const filteringOptions = TSColumns.map((e) => new Set());
  TSData.map((e, i) => e.map((b, j) => filteringOptions[j].add(b)));
  console.log("filtered Data:", filterTestSuites(TSData));
  console.log("unfiltered Data:", TSData);

  const firstHeaderOptions = {
    failed: testSuites.length,
    total: testSuites.reduce((acc, ele) => (ele.status ? acc : acc + 1), 0),
    title: "Test Suites",
    onPassedClick: () =>
      setFilterTestSuite(filterTestSuite === "passed" ? "any" : "passed"),
    onFailedClick: () =>
      setFilterTestSuite(filterTestSuite === "failed" ? "any" : "failed"),
    actionElements: (
      <div className="flex">
        <ShowInTable
          sx={{ color: "#ffca3a" }}
          onClick={() => setTestSuitesTableView(true)}
          open={testSuitesTableView}
          onClose={() => setTestSuitesTableView(false)}
          title="Test Suites"
          columns={TSColumns}
          data={filterTestSuites(TSData)}
        />
        <ShowFilter
          labels={TSColumns}
          filteringOptions={filteringOptions.map((e) => [...e])}
          onApply={(selectedFilters) => {
            setTestSuitesSelectedFilters(selectedFilters);
            setTestSuitesPage(0);
          }}
        />
      </div>
    ),
  };
  function filterPredict(filterOption, data) {
    if (filterOption === "passed" && data.status) return true;
    if (filterOption === "failed" && !data.status) return true;
    return filterOption === "any";
  }
  let firstColumnElements = testSuites
    .filter((data) => filterPredict(filterTestSuite, data))
    .map((data, i) => (
      <TSEntry
        data={data}
        key={data.id}
        num={i}
        onClick={() => {
          setActiveTestSuite(i);

          loadTestCases(data.id);
          setActiveTestCase(-1);
          setFilterTestCase("any");

          setValidationTags([]);
          setActiveValidationTag(-1);
          setFilterValidationTag("any");

          setValidationPoints([]);
          setActiveValidationPoint(-1);
          setFilterValidationPoint("any");
        }}
        active={activeTestSuite === i}
      />
    ));
  firstColumnElements = paginate(
    filterTestSuites(firstColumnElements),
    testSuitesPage,
    testSuitesRowsPerPage
  );

  const secondHeaderOptions = {
    total: testCases.length,
    failed: testCases.reduce((acc, ele) => (ele.status ? acc : acc + 1), 0),
    title: "Test Cases",
    onPassedClick: () =>
      setFilterTestCase(filterTestCase === "passed" ? "any" : "passed"),
    onFailedClick: () =>
      setFilterTestCase(filterTestCase === "failed" ? "any" : "failed"),
    actionElements: (
      <ShowInTable
        sx={{ color: "#ffca3a" }}
        onClick={() => setTestCasesTableView(true)}
        open={testCasesTableView}
        onClose={() => setTestCasesTableView(false)}
        title="Test Cases"
        columns={TCColumns}
        data={TCData}
      />
    ),
  };
  const secondColumnElements = testCases
    .filter((data) => filterPredict(filterTestCase, data))
    .map((data, i) => (
      <TCEntry
        data={data}
        key={data.id}
        num={i}
        onClick={() => {
          setActiveTestCase(i);

          loadValidationTags(data.id);
          setActiveValidationTag(-1);
          setFilterValidationTag("any");

          setValidationPoints([]);
          setActiveValidationPoint(-1);
          setFilterValidationPoint("any");
        }}
        active={activeTestCase === i}
      />
    ));

  const thirdHeaderOptions = {
    total: validationTags.length,
    failed: validationTags.reduce(
      (acc, ele) => (ele.status ? acc : acc + 1),
      0
    ),
    title: "Validation Tags",
    onPassedClick: () =>
      setFilterValidationTag(
        filterValidationTag === "passed" ? "any" : "passed"
      ),
    onFailedClick: () =>
      setFilterValidationTag(
        filterValidationTag === "failed" ? "any" : "failed"
      ),
    actionElements: (
      <ShowInTable
        sx={{ color: "#ffca3a" }}
        onClick={() => setValidationTagsTableView(true)}
        open={validationTagsTableView}
        onClose={() => setValidationTagsTableView(false)}
        title="Validation Tags"
        columns={VTColumns}
        data={VTData}
      />
    ),
  };
  const thirdColumnElements = validationTags
    .filter((data) => filterPredict(filterValidationTag, data))
    .map((data, i) => (
      <VTEntry
        data={data}
        key={data.id}
        num={i}
        onClick={() => {
          setActiveValidationTag(i);

          loadValidationPoints(data.id);
          setActiveValidationPoint(-1);
          setFilterValidationPoint("any");
        }}
        active={activeValidationTag === i}
      />
    ));

  const fourthHeaderOptions = {
    total: validationPoints.length,
    failed: validationPoints.reduce(
      (acc, ele) => (ele.status ? acc : acc + 1),
      0
    ),
    title: "Validation Points",
    onPassedClick: () =>
      setFilterValidationPoint(
        filterValidationPoint === "passed" ? "any" : "passed"
      ),
    onFailedClick: () =>
      setFilterValidationPoint(
        filterValidationPoint === "failed" ? "any" : "failed"
      ),
    actionElements: (
      <ShowInTable
        sx={{ color: "#ffca3a" }}
        onClick={() => setValidationPointsTableView(true)}
        open={validationPointsTableView}
        onClose={() => setValidationPointsTableView(false)}
        title="Validation Points"
        columns={VPColumns}
        data={VPData}
      />
    ),
  };
  const fourthColumnElements = validationPoints
    .filter((data) => filterPredict(filterValidationPoint, data))
    .map((data, i) => (
      <VPEntry
        data={data}
        key={data.id}
        num={i}
        onClick={() => {
          setActiveValidationPoint(i);
        }}
        active={activeValidationPoint === i}
      />
    ));

  return {
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

    testSuitesCount: filterTestSuites(testSuites).length,
    testSuitesPage,
    testSuitesRowsPerPage,
    handleTestSuitesPageChange,
    handleTestSuitesRowsPerPageChange,
  };
}

export default TestResultsAccordion;
