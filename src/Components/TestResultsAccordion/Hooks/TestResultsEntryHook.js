import { useState } from "react";

export function useTestResultsEntryState() {
  const [elements, setElements] = useState([]); // testCase, setTestCase
  const [activeElement, setActiveElement] = useState(-1);
  const [elementsFilter, setElementsFilter] = useState("any"); // any, passed, failed
  const [elementTableView, setElementsTableView] = useState(false);
  const [elementsPage, setElementsPage] = useState(0);
  const [elementsRowsPerPage, setElementsRowsPerPage] = useState(10);
  const [elementsLoading, setElementsLoading] = useState(false);
  const[elementsCount, setElementsCount] = useState(0)
  const handleElementsPageChange = (newPage) => {
    setActiveElement(-1);
    setElementsPage(newPage);
  };
  const handleElementsRowsPerPageChange = (newRows) => {
    setActiveElement(-1);
    setElementsRowsPerPage(newRows);
  };

  return [
    elements,
    setElements,
    activeElement,
    setActiveElement,
    elementsFilter,
    setElementsFilter,
    elementTableView,
    setElementsTableView,
    elementsPage,
    setElementsPage,
    elementsRowsPerPage,
    setElementsRowsPerPage,
    elementsLoading,
    setElementsLoading,
    handleElementsPageChange,
    handleElementsRowsPerPageChange,
    elementsCount,
    setElementsCount,
  ];
}
