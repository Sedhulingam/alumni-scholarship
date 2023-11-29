import React from "react";
import "./ProgrammeFilter.css";
import { MenuItem, TextField } from "@mui/material";

function ProgrammeFilter({ onFilter, filter }) {
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    onFilter(selectedValue);
  };

  return (
    <div className="filter-container-programme">
      <TextField
        id="outlined-select-currency"
        select
        label="Programme"
        defaultValue=""
        value={filter}
        onChange={handleFilterChange}
        helperText="Please select your Programme"
      >
        <MenuItem value="">Programme</MenuItem>
        <MenuItem value="UG">UG</MenuItem>
        <MenuItem value="PG">PG</MenuItem>
      </TextField>

      {/* <select
        className="custom-form-selecting form-select"
        aria-label="Default select example"
        value={filter}
        onChange={handleFilterChange}
        id="ProgrammeInput"
      >
        <option value="">Programme</option>
        <option value="UG">UG</option>
        <option value="PG">PG</option>
      </select> */}
    </div>
  );
}

export default ProgrammeFilter;
