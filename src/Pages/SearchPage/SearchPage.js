import React, { useEffect, useState } from "react";
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
import { fetchSearchPageOptions } from "../../Services/services";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const testSuitesFilters = {
  "Meta Data": [
    "Id",
    "Owner",
    "Version",
    "Machine",
    "Compilation Mode",
    "Platform",
    "Solution",
    "Tool name",
  ],

  "SA Configuration": [
    "mii_enum",
    "miiLaneNumber",
    "miiLaneWidth",
    "miiSpeed",
    "compiledFEC",
    "miiWireDelay",
  ],

  "MPG Configuration": [
    "compiledFEC",
    "mpgPortIdOffset",
    "mpgPortsNumber",
    "mpgLanesNumber",
    "mpgMaxLanesNumberList",
    "mpgLaneWidth",
    "mpgMaxLaneWidthList",
    "mpgOneG_ENABLED",
    "mpgWireDelay",
  ],
};
const testCasesFilters = {
  "Meta Data": ["Streaming Type", "Packet Per Burst"],
};
const validationTagsFilters = {
  "Meta Data": ["Description", "Executable Path", "Name"],
};
const validationPointsFilters = {
  Levels: ["Mac", "Direction", "Packet Identifier"],
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

  const [options, setOptions] = useState({});
  useEffect(() => {
    fetchSearchPageOptions().then((data) => setOptions(data));
  }, []);

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
      validationPoints: { levels: validationPointsValues.Levels },
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
              options={options.testSuites}
              defaultExpanded
            />
            <FilterAccordion
              title="Test Cases Filters"
              filters={testCasesFilters}
              values={testCasesValues}
              setValue={setTestCasesValues}
              options={options.testCases}
            />
            <FilterAccordion
              title="Validation Tags Filters"
              filters={validationTagsFilters}
              values={validationTagsValues}
              setValue={setValidationTagsValues}
              options={options.validationTags}
            />
            <FilterAccordion
              title="Validation Points Filters"
              filters={validationPointsFilters}
              values={validationPointsValues}
              setValue={setValidationPointsValues}
              options={options.validationPoints}
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

function FilterAccordion({
  title,
  filters,
  values,
  setValue,
  options = {},
  defaultExpanded,
}) {
  return (
    <Accordion elevation={0} defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ p: 0 }}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        {Object.entries(filters).map(([k, v]) => {
          return (
            <div className="py-5">
              <Divider>{k}</Divider>
              <div className="flex flex-col gap-4">
                {v.map((l) => (
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
                        options={options[k] ? options[k][l] || [] : []}
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
