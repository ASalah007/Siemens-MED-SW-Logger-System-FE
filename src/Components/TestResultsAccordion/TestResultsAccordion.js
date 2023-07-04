import React, { useState } from "react";
import HAccordion from "./components/HAccordion.js";
import { tss, tcs, vts, vps } from "../../data.js";
import TSEntry from "./components/TSEntry.js";
import TCEntry from "./components/TCEntry.js";
import VTEntry from "./components/VTEntry.js";
import VPEntry from "./components/VPEntry.js";
import HAccordionHeader from "./components/HAccoridionHeader.js";
import ShowInTable from "../ShowInTable/ShowInTable.js";
import { formatDuration } from "../../Utils/utilities.js";

function TestResultsAccordion() {
  const [testSuites, setTestSuites] = useState(tss);
  const [testCases, setTestCases] = useState([]);
  const [validationTags, setValidationTags] = useState([]);
  const [validationPoints, setValidationPoints] = useState([]);

  const [activeTestSuite, setActiveTestSuite] = useState(-1);
  const [activeTestCase, setActiveTestCase] = useState(-1);
  const [activeValidationTag, setActiveValidationTag] = useState(-1);
  const [activeValidationPoint, setActiveValidationPoint] = useState(-1);

  const [testSuitesTableView, setTestSuitesTableView] = useState(false);
  // const [testCasesTableView, setTestCasesTableView] = useState(false);

  const TSColumns = ["id", "status", "duration"].concat(
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

  // const TCColumns = ["id", "status", "duration"];
  // const TCData = testCases.map((e, i) => [
  //   i,
  //   String(e.status),
  //   formatDuration(new Date(e.end_date) - new Date(e.creation_date)),
  // ]);

  const firstHeader = (
    <HAccordionHeader
      data={testSuites}
      title="Test Suites"
      actionElements={
        <ShowInTable
          sx={{ color: "#ffca3a" }}
          onClick={() => setTestSuitesTableView(true)}
          open={testSuitesTableView}
          onClose={() => setTestSuitesTableView(false)}
          title="Test Suites"
          columns={TSColumns}
          data={TSData}
        />
      }
    />
  );
  const firstColumnElements = testSuites.map((data, i) => (
    <TSEntry
      data={data}
      key={data.id}
      num={i}
      onClick={() => {
        setActiveTestSuite(i);

        setTestCases(tcs); // TODO: change later
        setActiveTestCase(-1);

        setValidationTags([]);
        setActiveValidationTag(-1);

        setValidationPoints([]);
        setActiveValidationPoint(-1);
      }}
      active={activeTestSuite === i}
    />
  ));

  const secondHeader = <HAccordionHeader data={testCases} title="Test Cases" />;
  const secondColumnElements = testCases.map((data, i) => (
    <TCEntry
      data={data}
      key={data.id}
      num={i}
      onClick={() => {
        setActiveTestCase(i);
        setValidationTags(vts); // TODO: change later
        setActiveValidationTag(-1);

        setValidationPoints([]);
        setActiveValidationPoint(-1);
      }}
      active={activeTestCase === i}
    />
  ));

  const thirdHeader = (
    <HAccordionHeader data={validationTags} title="Validation Tags" />
  );
  const thirdColumnElements = validationTags.map((data, i) => (
    <VTEntry
      data={data}
      key={data.id}
      num={i}
      onClick={() => {
        setActiveValidationTag(i);

        setValidationPoints(vps); // TODO: change later
        setActiveValidationPoint(-1);
      }}
      active={activeValidationTag === i}
    />
  ));

  const fourthHeader = (
    <HAccordionHeader data={validationPoints} title="Validation Points" />
  );
  const fourthColumnElements = validationPoints.map((data, i) => (
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

  return (
    <div className="flex flex-col min-h-screen">
      <HAccordion
        firstColumnElements={firstColumnElements}
        firstHeader={firstHeader}
        secondColumnElements={secondColumnElements}
        secondHeader={secondHeader}
        thirdColumnElements={thirdColumnElements}
        thirdHeader={thirdHeader}
        fourthColumnElements={fourthColumnElements}
        fourthHeader={fourthHeader}
      />
    </div>
  );
}

export default TestResultsAccordion;
