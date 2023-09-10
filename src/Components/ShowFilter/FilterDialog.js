import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function FilterDialog({ open, onClose, labels, filteringOptions, onApply }) {
  const [selectedValues, setSelectedValues] = useState(
    labels && labels.map((e) => [])
  );
  return (
    <Dialog onClose={() => onClose()} open={open} maxWidth="lg">
      <DialogTitle className="flex items-center justify-between bg-gray-100">
        <div className="flex gap-5 items-baseline">
          <span>FILTERS</span>
          <Button
            size="small"
            onClick={() => {
              setSelectedValues(labels.map((e) => []));
            }}
          >
            Reset Filters
          </Button>
        </div>
        {onClose ? (
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent className="bg-gray-100">
        <div className="grid gap-x-10 gap-y-5 py-2 grid-cols-2">
          {labels &&
            labels.map((l, i) => (
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={filteringOptions[i]}
                getOptionLabel={(option) => String(option)}
                disableCloseOnSelect
                key={i}
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
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label={l} />}
                value={selectedValues[i]}
                onChange={(e, v) => {
                  const nw = [...selectedValues];
                  nw[i] = v;
                  setSelectedValues(nw);
                }}
              />
            ))}
        </div>
        <div className="flex justify-end px-5 pt-10 gap-5">
          <Button
            variant="outlined"
            onClick={() => onClose()}
            sx={{ width: 100 }}
            color="error"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ width: 100 }}
            onClick={() => {
              onApply && onApply(selectedValues);
              onClose();
            }}
          >
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FilterDialog;
