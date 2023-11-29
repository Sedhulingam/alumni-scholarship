import React from "react";
import "./GenderFilter.css";
import { MenuItem, TextField } from "@mui/material";

function GenderFilter({ onFilter, filter }) {
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    onFilter(selectedValue);
  };

  return (
    <div className="filter-container-gender">
      <TextField
          id="outlined-select-gender"
          select
          label="Gender"
          defaultValue=""
          value={filter}
          onChange={handleFilterChange}
          helperText="Please select your Gender"
        >
          
          <MenuItem  value="">
              Gender
            </MenuItem>
            <MenuItem  value="Male">
              Male
            </MenuItem>
            <MenuItem  value="Female">
              Female
            </MenuItem>
            <MenuItem  value="Others">
              Others
            </MenuItem>
        
        </TextField>
      {/* <select
        className="custom-form-selects form-select"
        aria-label="Default select example"
        value={filter}
        onChange={handleFilterChange}
        id="GenderInput"
      >
        <option value="">Gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="Other">Other</option>
      </select> */}
    </div>
  );
}

export default GenderFilter;
