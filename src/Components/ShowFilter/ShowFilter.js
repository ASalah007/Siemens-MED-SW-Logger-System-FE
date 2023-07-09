import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterDialog from "./FilterDialog";

function ShowFilter({ labels, filteringOptions, onApply }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip title="Filter" placement="top" disableInteractive>
        <IconButton onClick={() => setOpen(!open)}>
          <FilterListIcon sx={{ color: "#ffca3a" }} />
        </IconButton>
      </Tooltip>
      <FilterDialog
        open={open}
        onClose={() => setOpen(false)}
        filteringOptions={filteringOptions}
        onApply={onApply}
        labels={labels}
      />
    </>
  );
}

export default ShowFilter;
