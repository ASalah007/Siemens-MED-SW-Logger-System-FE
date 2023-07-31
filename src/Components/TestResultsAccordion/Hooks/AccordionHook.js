import React, { useState } from "react";
import TSEntry from "../components/TSEntry.js";
import TCEntry from "../components/TCEntry.js";
import VTEntry from "../components/VTEntry.js";
import VPEntry from "../components/VPEntry.js";
import ShowInTable from "../../ShowInTable/ShowInTable.js";
import { formatDuration } from "../../../Utils/utilities.js";
import ShowFilter from "../../ShowFilter/ShowFilter.js";
import { useTestResultsEntryState } from "./TestResultsEntryHook.js";

export default function useAccordionStates({
  nofilter = false,
  nostats = false,
}) {
  const [
    testCases,
    setTestCases,
    activeTestCase,
    setActiveTestCase,
    testCasesFilter,
    setTestCasesFilter,
    testCasesTableView,
    setTestCasesTableView,
    testCasesPage,
    setTestCasesPage,
    testCasesRowsPerPage,
    setTestCasesRowsPerPage,
    testCaseLoading,
    setTestCaseLoading,
    handleTestCasesPageChange,
    handleTestCasesRowsPerPageChange,
    testCasesCount,
    setTestCasesCount,
  ] = useTestResultsEntryState();

  const [
    validationTags,
    setValidationTags,
    activeValidationTag,
    setActiveValidationTag,
    validationTagsFilter,
    setValidationTagsFilter,
    validationTagsTableView,
    setValidationTagsTableView,
    validationTagsPage,
    setValidationTagsPage,
    validationTagsRowsPerPage,
    setValidationTagsRowsPerPage,
    validationTagsLoading,
    setValidationTagsLoading,
    handleValidationTagsPageChange,
    handleValidationTagsRowsPerPageChange,
    validationTagsCount,
    setValidationTagsCount,
  ] = useTestResultsEntryState();

  const [
    validationPoints,
    setValidationPoints,
    activeValidationPoint,
    setActiveValidationPoint,
    validationPointsFilter,
    setValidationPointsFilter,
    validationPointsTableView,
    setValidationPointsTableView,
    validationPointsPage,
    setValidationPointsPage,
    validationPointsRowsPerPage,
    setValidationPointsRowsPerPage,
    validationPointsLoading,
    setValidationPointsLoading,
    handleValidationPointsPageChange,
    handleValidationPointsRowsPerPageChange,
    validationPointsCount,
    setValidationPointsCount,
  ] = useTestResultsEntryState();

  const [
    testSuites,
    setTestSuites,
    activeTestSuite,
    setActiveTestSuite,
    testSuitesFilter,
    setTestSuitesFilter,
    testSuitesTableView,
    setTestSuitesTableView,
    testSuitesPage,
    setTestSuitesPage,
    testSuitesRowsPerPage,
    setTestSuitesRowsPerPage,
    testSuiteLoading,
    setTestSuiteLoading,
    handleTestSuitesPageChange,
    handleTestSuitesRowsPerPageChange,
    testSuitesCount,
    setTestSuitesCount,
  ] = useTestResultsEntryState();

  const [testSuitesStatistics, setTestSuitesStatistics] = useState({});

  const [testSuitesSelectedFilters, setTestSuitesSelectedFilters] = useState(
    []
  );

  function reset(type) {
    switch (type) {
      case "TC":
        setTestCases([]);
        setActiveTestCase(-1);
        setTestCasesFilter("any");
        setTestCasesPage(0);
      // eslint-disable-next-line no-fallthrough
      case "VT":
        setValidationTags([]);
        setActiveValidationTag(-1);
        setValidationTagsFilter("any");
        setValidationTagsPage(0);
      // eslint-disable-next-line no-fallthrough
      case "VP":
        setValidationPoints([]);
        setActiveValidationPoint(-1);
        setValidationPointsFilter("any");
        setValidationPointsPage(0);
        break;

      default:
        break;
    }
  }

  const TSColumns = ["id", "status", "duration"].concat(
    testSuites.length > 0 &&
      Object.keys(testSuites[0].metaData).filter((k) => k !== "design_info")
  );

  const TSData = testSuites.map((e, i) => [
    i + 1,
    e.status ? "🟢" : "🔴",
    formatDuration(new Date(e.end_date) - new Date(e.creation_date)),
    ...Object.entries(e.metaData)
      .filter(([k, v]) => k !== "design_info")
      .flatMap(([k, v]) => v),
  ]);

  const TCColumns = ["id", "status", "duration", "failed VTs"];
  const TCData = testCases.map((e, i) => [
    i + 1,
    e.status ? "🟢" : "🔴",
    formatDuration(new Date(e.end_date) - new Date(e.creation_date)),
    `${e.failedValidationTagsCount}/${e.ValidationTagsCount}`,
  ]);

  const VTColumns = [
    "name",
    "status",
    "duration",
    "descrition",
    "executable Path",
    "failed VPs",
  ];
  const VTData = validationTags.map((e) => [
    e.metaData.name,
    e.status ? "🟢" : "🔴",
    formatDuration(new Date(e.end_date) - new Date(e.creation_date)),
    e?.metaData?.metaData?.Description,
    e?.metaData?.metaData && e.metaData.metaData["Executable Path"],
    `${e.failedValidationPointsCount}/${e.ValidationPointsCount}`,
  ]);

  const VPColumns = ["id", "status", "mac", "direction", "failed results"];
  const VPData = validationPoints.map((e, i) => [
    i + 1,
    e.status ? "🟢" : "🔴",
    e?.levels?.mac,
    e?.levels?.direction,
    e.results
      ? `${e.results.reduce((acc, ele) => (acc += ele.status === "fail"), 0)}/${
          e.results.length
        }`
      : "N/A",
  ]);

  function applyFilters(arr, filters, data) {
    if (filters.length === 0) return [...arr];
    const f = data.map((e) =>
      e.reduce(
        (acc, ele, i) =>
          (!filters[i] ||
            filters[i].length === 0 ||
            filters[i].includes(ele)) &&
          acc,
        true
      )
    );
    return arr.filter((e, i) => f[i]);
  }

  const filterTestSuites = (arr) =>
    applyFilters(arr, testSuitesSelectedFilters, TSData);

  const filteringOptions = TSColumns.map((e) => new Set());
  TSData.map((e, i) => e.map((b, j) => filteringOptions[j].add(b)));

  const firstHeaderOptions = {
    failed: testSuitesStatistics.failed,
    total: testSuitesStatistics.total,
    title: "Test Suites",
    onPassedClick: () => {
      setTestSuitesFilter(testSuitesFilter === "passed" ? "any" : "passed");
      setActiveTestSuite(-1);
      setTestSuitesPage(0);
    },
    onFailedClick: () => {
      setTestSuitesFilter(testSuitesFilter === "failed" ? "any" : "failed");
      setActiveTestSuite(-1);
      setTestSuitesPage(0);
    },
    nostats,
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
          page={testSuitesPage}
          count={testSuitesCount}
          onPageChange={handleTestSuitesPageChange}
          onRowsPerPageChange={handleTestSuitesRowsPerPageChange}
          rowsPerPage={testSuitesRowsPerPage}
          nativePagination={false}
        />
        {!nofilter && (
          <ShowFilter
            labels={TSColumns}
            filteringOptions={filteringOptions.map((e) => [...e])}
            onApply={(selectedFilters) => {
              setTestSuitesSelectedFilters(selectedFilters);
              setTestSuitesPage(0);
            }}
          />
        )}
      </div>
    ),
  };
  let firstColumnElements = testSuites.map((data, i) => (
    <TSEntry
      data={data}
      key={data._id}
      num={testSuitesRowsPerPage * testSuitesPage + i + 1}
      onClick={() => {
        setActiveTestSuite(i);
      }}
      active={activeTestSuite === i}
    />
  ));

  firstColumnElements = filterTestSuites(firstColumnElements);

  const secondHeaderOptions = {
    total:
      activeTestSuite > -1 ? testSuites[activeTestSuite].TestCasesCount : 0,
    failed:
      activeTestSuite > -1
        ? testSuites[activeTestSuite].failedTestCasesCount
        : 0,
    title: "Test Cases",
    onPassedClick: () => {
      setTestCasesFilter(testCasesFilter === "passed" ? "any" : "passed");
      setActiveTestCase(-1);
      setTestCasesPage(0);
    },
    onFailedClick: () => {
      setTestCasesFilter(testCasesFilter === "failed" ? "any" : "failed");
      setActiveTestCase(-1);
      setTestCasesPage(0);
    },
    nostats,
    actionElements: (
      <ShowInTable
        sx={{ color: "#ffca3a" }}
        onClick={() => setTestCasesTableView(true)}
        open={testCasesTableView}
        onClose={() => setTestCasesTableView(false)}
        title="Test Cases"
        columns={TCColumns}
        data={TCData}
        page={testCasesPage}
        count={testCasesCount}
        onPageChange={handleTestCasesPageChange}
        onRowsPerPageChange={handleTestCasesRowsPerPageChange}
        rowsPerPage={testCasesRowsPerPage}
        nativePagination={false}
      />
    ),
  };

  const secondColumnElements = testCases.map((data, i) => (
    <TCEntry
      data={data}
      key={data._id}
      num={testCasesRowsPerPage * testCasesPage + i + 1}
      onClick={() => {
        setActiveTestCase(i);
      }}
      active={activeTestCase === i}
    />
  ));

  const thirdHeaderOptions = {
    total:
      activeTestCase > -1 ? testCases[activeTestCase].ValidationTagsCount : 0,
    failed:
      activeTestCase > -1
        ? testCases[activeTestCase].failedValidationTagsCount
        : 0,
    title: "Validation Tags",
    onPassedClick: () => {
      setValidationTagsFilter(
        validationTagsFilter === "passed" ? "any" : "passed"
      );
      setValidationTagsPage(0);
      setActiveValidationTag(-1);
    },
    onFailedClick: () => {
      setValidationTagsFilter(
        validationTagsFilter === "failed" ? "any" : "failed"
      );
      setValidationTagsPage(0);
      setActiveValidationTag(-1);
    },
    nostats,
    actionElements: (
      <ShowInTable
        sx={{ color: "#ffca3a" }}
        onClick={() => setValidationTagsTableView(true)}
        open={validationTagsTableView}
        onClose={() => setValidationTagsTableView(false)}
        title="Validation Tags"
        columns={VTColumns}
        data={VTData}
        page={validationTagsPage}
        count={validationTagsCount}
        onPageChange={handleValidationTagsPageChange}
        onRowsPerPageChange={handleValidationTagsRowsPerPageChange}
        rowsPerPage={validationTagsRowsPerPage}
        nativePagination={false}
      />
    ),
  };
  const thirdColumnElements = validationTags.map((data, i) => (
    <VTEntry
      data={data}
      key={data._id}
      num={validationTagsRowsPerPage * validationPointsPage + i + 1}
      onClick={() => {
        setActiveValidationTag(i);
      }}
      active={activeValidationTag === i}
    />
  ));

  const fourthHeaderOptions = {
    total:
      activeValidationTag > -1
        ? validationTags[activeValidationTag].ValidationPointsCount
        : 0,
    failed:
      activeValidationTag > -1
        ? validationTags[activeValidationTag].failedValidationPointsCount
        : 0,
    title: "Validation Points",
    onPassedClick: () => {
      setValidationPointsFilter(
        validationPointsFilter === "passed" ? "any" : "passed"
      );
      setActiveValidationPoint(-1);
      setValidationPointsPage(0);
    },
    onFailedClick: () => {
      setValidationPointsFilter(
        validationPointsFilter === "failed" ? "any" : "failed"
      );
      setActiveValidationPoint(-1);
      setValidationPointsPage(0);
    },
    nostats,
    actionElements: (
      <ShowInTable
        sx={{ color: "#ffca3a" }}
        onClick={() => setValidationPointsTableView(true)}
        open={validationPointsTableView}
        onClose={() => setValidationPointsTableView(false)}
        title="Validation Points"
        columns={VPColumns}
        data={VPData}
        page={validationPointsPage}
        count={validationPointsCount}
        onPageChange={handleValidationPointsPageChange}
        onRowsPerPageChange={handleValidationPointsRowsPerPageChange}
        rowsPerPage={validationPointsRowsPerPage}
        nativePagination={false}
      />
    ),
  };

  const fourthColumnElements = validationPoints.map((data, i) => (
    <VPEntry
      data={data}
      key={data._id}
      num={validationPointsRowsPerPage * validationPointsPage + i + 1}
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
    setActiveTestCase,
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

    testSuitesCount,
    testSuitesPage,
    testSuitesRowsPerPage,
    handleTestSuitesPageChange,
    handleTestSuitesRowsPerPageChange,
    testSuiteLoading,
    setTestSuiteLoading,
    setTestSuites,
    setTestCaseLoading,
    setTestCases,
    setValidationTagsLoading,
    setValidationTags,
    setValidationPointsLoading,
    setValidationPoints,
    testSuites,
    testCases,
    validationPoints,
    setTestSuitesStatistics,
    setActiveValidationPoint,
    setActiveValidationTag,

    testSuitesFilter,
    testCasesFilter,
    validationTagsFilter,
    validationPointsFilter,
    reset,

    setTestSuitesCount,
    setTestCasesCount,
    setValidationTagsCount,
    setValidationPointsCount,

    testSuitesStatistics,
  };
}
