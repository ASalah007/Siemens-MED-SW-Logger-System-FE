import React, { useEffect, useState } from "react";
import TSEntry from "../components/TSEntry.js";
import TCEntry from "../components/TCEntry.js";
import VTEntry from "../components/VTEntry.js";
import VPEntry from "../components/VPEntry.js";
import ShowInTable from "../../ShowInTable/ShowInTable.js";
import { formatDuration } from "../../../Utils/utilities.js";
import {
  fetchTestCases,
  fetchValidationPoints,
  fetchValidationTags,
} from "../../../Services/services.js";
import ShowFilter from "../../ShowFilter/ShowFilter.js";
import { useTestResultsEntryState } from "./TestResultsEntryHook.js";

export function useTestResultsAccordionStates({
  testSuites,
  activeTestSuite,
  setActiveTestSuite,
  testSuitesTableView,
  setTestSuitesTableView,
  testSuitesPage,
  setTestSuitesPage,
  testSuitesRowsPerPage,
  testSuitesFilter,
  setTestSuitesFilter,
  testSuitesCount,
  handleTestSuitesPageChange,
  handleTestSuitesRowsPerPageChange,
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
  ] = useTestResultsEntryState();

  const [
    validationTags,
    setValidationTags,
    activeValidationTag,
    setActiveValidationTag,
    filterValidationTag,
    setFilterValidationTag,
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
  ] = useTestResultsEntryState();

  const [
    validationPoints,
    setValidationPoints,
    activeValidationPoint,
    setActiveValidationPoint,
    filterValidationPoint,
    setFilterValidationPoint,
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
  ] = useTestResultsEntryState();

  const [testSuitesSelectedFilters, setTestSuitesSelectedFilters] = useState(
    []
  );

  const testCasesCount =
    activeTestSuite > -1 ? testSuites[activeTestSuite].TestCasesCount : 0;

  const validationTagsCount =
    activeTestCase > -1 ? testCases[activeTestCase].ValidationTagsCount : 0;

  const validationPointsCount =
    activeValidationTag > -1
      ? validationTags[activeValidationTag].ValidationPointsCount
      : 0;

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
        setFilterValidationTag("any");
        setValidationTagsPage(0);
      // eslint-disable-next-line no-fallthrough
      case "VP":
        setValidationPoints([]);
        setActiveValidationPoint(-1);
        setFilterValidationPoint("any");
        setValidationPointsPage(0);
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    if (activeTestSuite < 0) {
      reset("TC");
      return;
    }
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
    if (activeTestCase < 0) {
      reset("VT");
      return;
    }
    setValidationTagsLoading(true);
    fetchValidationTags(
      testCases[activeTestCase]._id,
      validationTagsRowsPerPage,
      validationTagsPage + 1
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
  ]);

  useEffect(() => {
    if (activeValidationTag < 0) {
      reset("VP");
      return;
    }
    setValidationPointsLoading(true);
    fetchValidationPoints(
      validationTags[activeValidationTag]._id,
      validationPointsRowsPerPage,
      validationPointsPage + 1
    ).then((data) => {
      setValidationPoints(data);
      setValidationPointsLoading(false);
    });
  }, [
    activeValidationTag,
    validationTags,
    validationPointsRowsPerPage,
    validationPointsPage,
  ]);

  const TSColumns = ["id", "status", "duration"].concat(
    testSuites.length > 0 &&
      Object.keys(testSuites[0].metaData).filter((k) => k !== "design_info")
  );

  const TSData = testSuites.map((e, i) => [
    i + 1,
    e.status ? "pass" : "fail",
    formatDuration(new Date(e.end_date) - new Date(e.creation_date)),
    ...Object.entries(e.metaData)
      .filter(([k, v]) => k !== "design_info")
      .flatMap(([k, v]) => v),
  ]);

  const TCColumns = ["id", "status", "duration", "failed VTs"];
  const TCData = testCases.map((e, i) => [
    i + 1,
    e.status ? "pass" : "fail",
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
    e.status ? "pass" : "fail",
    formatDuration(new Date(e.end_date) - new Date(e.creation_date)),
    e?.metaData?.metaData?.Description,
    e?.metaData?.metaData && e.metaData.metaData["Executable Path"],
    `${e.failedValidationPointsCount}/${e.ValidationPointsCount}`,
  ]);

  const VPColumns = ["id", "status", "mac", "direction", "failed results"];
  const VPData = validationPoints.map((e, i) => [
    i + 1,
    e.status ? "pass" : "fail",
    e.levels.mac,
    e.levels.direction,
    `${e.results.reduce((acc, ele) => (acc += ele.status === "fail"), 0)}/${
      e.results.length
    }`,
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

  const filteringOptions = TSColumns.map((e) => new Set());
  TSData.map((e, i) => e.map((b, j) => filteringOptions[j].add(b)));

  const firstHeaderOptions = {
    failed: testSuites.reduce((acc, ele) => (ele.status ? acc : acc + 1), 0),
    total: testSuites.length,
    title: "Test Suites",
    onPassedClick: () =>
      setTestSuitesFilter(testSuitesFilter === "passed" ? "any" : "passed"),
    onFailedClick: () =>
      setTestSuitesFilter(testSuitesFilter === "failed" ? "any" : "failed"),
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
  function filterPredicate(filterOption, data) {
    if (filterOption === "passed" && data.status) return true;
    if (filterOption === "failed" && !data.status) return true;
    return filterOption === "any";
  }
  let firstColumnElements = testSuites.map((data, i) => (
    <TSEntry
      data={data}
      key={data._id}
      num={testSuitesRowsPerPage * testSuitesPage + i + 1}
      onClick={() => {
        setActiveTestSuite(i);
        setActiveTestCase(-1);
        setActiveValidationTag(-1);
        setActiveValidationPoint(-1);
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
    onPassedClick: () =>
      setTestCasesFilter(testCasesFilter === "passed" ? "any" : "passed"),
    onFailedClick: () =>
      setTestCasesFilter(testCasesFilter === "failed" ? "any" : "failed"),
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
        setActiveValidationTag(-1);
        setActiveValidationPoint(-1);
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
        page={validationTagsPage}
        count={validationTagsCount}
        onPageChange={handleValidationTagsPageChange}
        onRowsPerPageChange={handleValidationTagsRowsPerPageChange}
        rowsPerPage={validationTagsRowsPerPage}
        nativePagination={false}
      />
    ),
  };
  const thirdColumnElements = validationTags
    .filter((data) => filterPredicate(filterValidationTag, data))
    .map((data, i) => (
      <VTEntry
        data={data}
        key={data._id}
        num={validationTagsRowsPerPage * validationPointsPage + i + 1}
        onClick={() => {
          setActiveValidationTag(i);
          setActiveValidationPoint(-1);
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
        page={validationPointsPage}
        count={validationPointsCount}
        onPageChange={handleValidationPointsPageChange}
        onRowsPerPageChange={handleValidationPointsRowsPerPageChange}
        rowsPerPage={validationPointsRowsPerPage}
        nativePagination={false}
      />
    ),
  };
  const fourthColumnElements = validationPoints
    .filter((data) => filterPredicate(filterValidationPoint, data))
    .map((data, i) => (
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
  };
}
