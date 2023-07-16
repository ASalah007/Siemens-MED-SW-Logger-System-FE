import { IconButton, MenuItem, Select } from "@mui/material";
import React from "react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";

function TablePagination({
  count,
  page,
  rowsPerPage,
  onRowsPerPageChange,
  onPageChange,
}) {
  rowsPerPage = rowsPerPage || 10;
  page = page || 0;
  count = count || 0;
  const pos = `${count===0?0:page * rowsPerPage + 1}-${Math.min(
    page * rowsPerPage + rowsPerPage,
    count
  )} of ${count}`;

  return (
    <div className="flex items-center justify-center gap-3 pl-2">
      <div className="flex items-center gap-3">
        <div>Rows Per Page: </div>
        <div>
          <Select
            value={rowsPerPage}
            onChange={(e) =>
              onRowsPerPageChange && onRowsPerPageChange(e.target.value)
            }
            defaultValue={10}
            size="small"
            variant="standard"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </div>
      </div>
      <div>{pos}</div>
      <div>
        <IconButton
          sx={{ color: "#000" }}
          disabled={page === 0}
          onClick={() => onPageChange(Math.max(0, page - 1))}
        >
          <KeyboardArrowLeftRoundedIcon />
        </IconButton>
        <IconButton
          sx={{ color: "#000" }}
          disabled={page === Math.ceil(count / rowsPerPage) - 1 || count === 0}
          onClick={() =>
            onPageChange(Math.min(page + 1, Math.ceil(count / rowsPerPage) - 1))
          }
        >
          <KeyboardArrowRightRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default TablePagination;
