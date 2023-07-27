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
  CircularProgress,
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
    "id",
    "owner",
    "version",
    "machine",
    "compilation_mode",
    "platform",
    "solution",
    "tool_name",
    "status",
  ],

  // "SA Configuration": [
  //   "mii_enum",
  //   "miiLaneNumber",
  //   "miiLaneWidth",
  //   "miiSpeed",
  //   "compiledFEC",
  //   "miiWireDelay",
  // ],

  // "MPG Configuration": [
  //   "compiledFEC",
  //   "mpgPortIdOffset",
  //   "mpgPortsNumber",
  //   "mpgLanesNumber",
  //   "mpgMaxLanesNumberList",
  //   "mpgLaneWidth",
  //   "mpgMaxLaneWidthList",
  //   "mpgOneG_ENABLED",
  //   "mpgWireDelay",
  // ],
};
const testCasesFilters = {
  "Meta Data": ["status"],
};
const validationTagsFilters = {
  "Meta Data": ["Description", "executable_path", "name", "status"],
};
const validationPointsFilters = {
  Levels: ["mac", "direction", "packet_identifier", "status"],
};

function createObjectByKeys(filters) {
  function transformArray(arr) {
    return arr.reduce((acc, ele) => {
      acc[ele] = [];
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

  const [returnResult, setReturnResult] = useState("testSuite");

  function clearSearch() {
    setTestSuitesValues(createObjectByKeys(testSuitesFilters));
    setTestCasesValues(createObjectByKeys(testCasesFilters));
    setValidationTagsValues(createObjectByKeys(validationTagsFilters));
    setValidationPointsValues(createObjectByKeys(validationPointsFilters));
    setSearched(0);
  }
  const [searched, setSearched] = useState(0);
  const [loading, setLoading] = useState(false);

  function search() {
    const errs = document.getElementsByClassName("err");
    if (errs.length > 0) {
      setSearched(0);
      errs[0].scrollIntoView();
    } else setSearched((o) => o + 1);
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      <Nav />

      <div className="grow flex overflow-hidden">
        <div className="grow flex items-stretch justify-center">
          {searched ? (
            <SearchResultsAccordion
              returnResult={returnResult}
              filterValues={{
                testSuitesValues,
                validationTagsValues,
                validationPointsValues,
              }}
              searched={searched}
            />
          ) : loading ? (
            <div className="grow flex items-center justify-center">
              <CircularProgress thickness={5} />
            </div>
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
              size="small"
              value={returnResult}
              onChange={(e) => {
                setReturnResult(e.target.value);
                setSearched(0);
              }}
            >
              <MenuItem value="testSuite">Test Suites</MenuItem>
              <MenuItem value="testCase">Test Cases</MenuItem>
              <MenuItem value="validationTag">Validation Tags</MenuItem>
              <MenuItem value="validationPoint">Validation Points</MenuItem>
            </Select>
          </FilterItem>

          {
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
          }
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
  const errCond = (k, l) => {
    return (
      values[k][l].length > 0 &&
      values[k][l].some((el) => {
        if (!options[k] || !options[k][l]) return false;
        return !options[k][l].map((e) => String(e)).includes(el);
      })
    );
  };
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
                        options={
                          options[k]
                            ? options[k][l]
                              ? options[k][l].map((e) => String(e))
                              : []
                            : []
                        }
                        // options={["op1", "op2"]}
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
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={errCond(k, l)}
                            helperText={
                              errCond(k, l) &&
                              "there is an option that doesn't exist in the database"
                            }
                            className={
                              errCond(k, l) &&
                              values[k][l].length === 1 &&
                              "err"
                            }
                          />
                        )}
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
