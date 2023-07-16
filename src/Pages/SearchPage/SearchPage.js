import React, { useState } from "react";
import Nav from "../../Components/Navbar/Nav";
import SearchResultsAccordion from "../../Components/SearchResultsAccordion/SearchResultsAccordion";
import {
  Autocomplete,
  Button,
  Checkbox,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Folder from "../../Components/Folder";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const testSuitesFilters = [
  "status",
  "owner",
  "version",
  "machine",
  "compilation mode",
  "solution",
  "tool name",
];
const testCasesFilters = ["Streaming Type", "Packet Per Burst"];
const validationTagsFilters = ["Description", "Executable Path", "Type"];
const validationPointsFilters = ["mac", "direction"];

const testSuitesOptions = {
  status: ["true", "false"],
  owner: ["ahmed1", "ahmed2", "ahmed3"],
  version: ["12.1.1", "11.1.1"],
};

const testCasesOptions = {
  "Streaming Type": ["st1", "st2"],
};
const validationTagsOptions = {
  Type: ["frame validation"],
};
const validationPointsOptions = {
  mac: ["1", "2"],
};

function createObjectByKeys(keys) {
  return keys.reduce((obj, key) => {
    obj[key] = [];
    return obj;
  }, {});
}

function SearchPage() {
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

  function clearSearch() {
    setTestSuitesValues(createObjectByKeys(testSuitesFilters));
    setTestCasesValues(createObjectByKeys(testCasesFilters));
    setValidationTagsValues(createObjectByKeys(validationTagsFilters));
    setValidationPointsValues(createObjectByKeys(validationPointsFilters));
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <div className="grow flex flex-col gap-5">
        <div className="flex items-baseline p-5 gap-4">
          <h1 className="font-semibold text-4xl">Search</h1>
          <Button size="small" onClick={clearSearch}>
            clear search
          </Button>
        </div>

        <div className="flex gap-5 items-center p-4">
          <div className="flex gap-1 items-center whitespace-nowrap">
            <div>Results Type:</div>
            <div className="grow">
              <Select
                autoWidth
                variant="standard"
                defaultValue={"TS"}
                size="small"
              >
                <MenuItem value={"TS"}>Test Suites</MenuItem>
                <MenuItem value={"TC"}>Test Cases</MenuItem>
                <MenuItem value={"VT"}>Validation Tags</MenuItem>
                <MenuItem value={"VP"}>Validation Points</MenuItem>
              </Select>
            </div>
          </div>
          <Button variant="contained">Search</Button>
        </div>

        <div className="grid grid-cols-2 gap-x-5">
          <div>
            <Folder title="Test Suit Filters">
              <div className="grid grid-cols-2 gap-3 p-2">
                {testSuitesFilters.map((e) => (
                  <FilterItem
                    label={e}
                    options={testSuitesOptions[e]}
                    value={testSuitesValues[e]}
                    onChange={(event, value) =>
                      setTestSuitesValues((o) => {
                        const nw = { ...o };
                        nw[e] = value;
                        return nw;
                      })
                    }
                  />
                ))}
              </div>
            </Folder>

            <Folder title="Test Case Filters">
              <div className="grid grid-cols-2 gap-3 p-2">
                {testCasesFilters.map((e) => (
                  <FilterItem
                    label={e}
                    options={testCasesOptions[e]}
                    value={testCasesValues[e]}
                    onChange={(event, value) =>
                      setTestCasesValues((o) => {
                        const nw = { ...o };
                        nw[e] = value;
                        return nw;
                      })
                    }
                  />
                ))}
              </div>
            </Folder>
          </div>

          <div>
            <Folder title="Validation Tag Filters">
              <div className="grid grid-cols-2 gap-3 p-2">
                {validationTagsFilters.map((e) => (
                  <FilterItem
                    label={e}
                    options={validationTagsOptions[e]}
                    value={validationTagsValues[e]}
                    onChange={(event, value) =>
                      setValidationTagsValues((o) => {
                        const nw = { ...o };
                        nw[e] = value;
                        return nw;
                      })
                    }
                  />
                ))}
              </div>
            </Folder>

            <Folder title="Validation Point Filters">
              <div className="grid grid-cols-2 gap-3 p-2">
                {validationPointsFilters.map((e) => (
                  <FilterItem
                    label={e}
                    options={validationPointsOptions[e]}
                    value={validationPointsValues[e]}
                    onChange={(event, value) =>
                      setValidationPointsValues((o) => {
                        const nw = { ...o };
                        nw[e] = value;
                        return nw;
                      })
                    }
                  />
                ))}
              </div>
            </Folder>
          </div>
        </div>

        <div className="grow flex flex-col min-h-[600px]">
          <SearchResultsAccordion />
        </div>
      </div>
    </div>
  );
}

function FilterItem({ label, options, value, onChange }) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  return (
    <Autocomplete
      multiple
      getOptionLabel={(option) => String(option)}
      options={options || []}
      disableCloseOnSelect
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
      fullWidth
      renderInput={(params) => <TextField {...params} label={label} />}
      value={value}
      onChange={onChange}
    />
  );
}
export default SearchPage;
