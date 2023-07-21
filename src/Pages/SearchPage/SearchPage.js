import React, { useState } from "react";
import Nav from "../../Components/Navbar/Nav";
import SearchResultsAccordion from "../../Components/SearchResultsAccordion/SearchResultsAccordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import searchImage from "../../Resources/search.svg";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const testSuitesFilters = {
  "Meta Data": [
    ["Id", false],
    ["Owner", true],
    ["Version", true],
    ["Machine", true],
    ["Compilation Mode", true],
    ["Platform", true],
    ["Solution", true],
    ["Tool name", true],
    ["Status", true],
  ],

  "SA Configuration": [
    ["mii_enum", true],
    ["miiLaneNumber", false],
    ["miiLaneWidth", false],
    ["miiSpeed", false],
    ["compiledFEC", true],
    ["miiWireDelay", false],
  ],

  "MPG Configuration": [
    ["compiledFEC", true],
    ["mpgPortIdOffset", false],
    ["mpgPortsNumber", false],
    ["mpgLanesNumber", false],
    ["mpgMaxLanesNumberList", false],
    ["mpgLaneWidth", false],
    ["mpgMaxLaneWidthList", false],
    ["mpgOneG_ENABLED", false],
    ["mpgWireDelay", false],
  ],
};
const testCasesFilters = {
  "Meta Data": [
    ["Streaming Type", true],
    ["Packet Per Burst", false],
  ],
};
const validationTagsFilters = {
  "Meta Data": [
    ["Description", false],
    ["Executable Path", false],
    ["Type", true],
  ],
};
const validationPointsFilters = {
  Levels: [
    ["Mac", false],
    ["Direction", true],
    ["Packet Identifier", false],
  ],
};

function createObjectByKeys(filters) {
  // [["a",true], [...]] => {"a": [], "":[]}
  function transformArray(arr) {
    return arr.reduce((acc, ele) => {
      acc[ele[0]] = [];
      return acc;
    }, {});
  }

  return Object.entries(filters).reduce((acc, [k, v]) => {
    acc[k] = transformArray(v);
    return acc;
  }, {});
}

export default function SearchPage() {
  const [testSuitesValues, setTestSuitesValues] = useState(
    createObjectByKeys(testSuitesFilters)
  );
  const [testCasesValues, setTestCasesValues] = useState(
    createObjectByKeys(testCasesFilters)
  );
  const [validationTagsValues, setValidationTagsValues] = useState(
    createObjectByKeys(validationTagsFilters)
  );
  const [validationPointsValues, setValidationPointsValues] = useState(
    createObjectByKeys(validationPointsFilters)
  );
  const [returnResult, setReturnResult] = useState();

  function clearSearch() {
    setTestSuitesValues(createObjectByKeys(testSuitesFilters));
    setTestCasesValues(createObjectByKeys(testCasesFilters));
    setValidationTagsValues(createObjectByKeys(validationTagsFilters));
    setValidationPointsValues(createObjectByKeys(validationPointsFilters));
  }
  const [searched, setSearched] = useState(false);

  function search() {
    console.log({
      returnResult,
      testSuites: {
        ...testSuitesValues["Meta Data"],
        design_info: {
          dut_instance_info: {
            sa_configuration: testSuitesValues["SA Configuration"],
            mpg_configuration: testSuitesValues["MPG Configuration"],
          },
        },
      },
      testCases: testCasesValues["Meta Data"],
      validationTags: validationTagsValues,
      validationPoints: { levels: validationTagsValues.Levels },
    });
    setSearched(true);
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      <Nav />

      <div className="grow flex overflow-hidden">
        <div className="grow flex items-stretch justify-center">
          {searched ? (
            <SearchResultsAccordion />
          ) : (
            <img src={searchImage} alt="img" />
          )}
        </div>

        {/* filters list */}
        <div className="py-4 px-3 border-l overflow-auto flex flex-col gap-5 w-96">
          <div className="flex justify-around">
            <Button onClick={clearSearch}>Clear search</Button>
            <Button variant="contained" onClick={() => search()}>
              Search
            </Button>
          </div>

          <FilterItem label="Return Result">
            <Select
              defaultValue="TS"
              size="small"
              value={returnResult}
              onChange={(e) => setReturnResult(e.target.value)}
            >
              <MenuItem value="TS">Test Suites</MenuItem>
              <MenuItem value="TC">Test Cases</MenuItem>
              <MenuItem value="VT">Validation Tags</MenuItem>
              <MenuItem value="VP">Validation Points</MenuItem>
            </Select>
          </FilterItem>

          <div>
            <FilterAccordion
              title="Test Suites Filters"
              filters={testSuitesFilters}
              values={testSuitesValues}
              setValue={setTestSuitesValues}
            />
            <FilterAccordion
              title="Test Cases Filters"
              filters={testCasesFilters}
              values={testCasesValues}
              setValue={setTestCasesValues}
            />
            <FilterAccordion
              title="Validation Tags Filters"
              filters={validationTagsFilters}
              values={validationTagsValues}
              setValue={setValidationTagsValues}
            />
            <FilterAccordion
              title="Validation Points Filters"
              filters={validationPointsFilters}
              values={validationPointsValues}
              setValue={setValidationPointsValues}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterItem({ label, children }) {
  return (
    <div className="flex flex-col gap-1 whitespace-nowrap">
      <div className="font-semibold text-gray-400">{label}</div>
      {children}
    </div>
  );
}

function FilterAccordion({ title, filters, values, setValue }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {Object.entries(filters).map(([k, v]) => {
          return (
            <div className="py-5">
              <Divider>{k}</Divider>
              <div className="flex flex-col gap-4">
                {v.map(([l, ac]) => (
                  <FilterItem label={l}>
                    {
                      <Autocomplete
                        size="small"
                        multiple
                        freeSolo
                        disableCloseOnSelect
                        value={values[k][l]}
                        onChange={(e, v) =>
                          setValue((o) => {
                            const nw = JSON.parse(JSON.stringify(o));
                            nw[k][l] = v;
                            return nw;
                          })
                        }
                        options={ac ? ["o1", "o2", "o3"] : []}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option}
                          </li>
                        )}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    }
                  </FilterItem>
                ))}
              </div>
            </div>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
}
