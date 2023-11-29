import React from "react";
import "./ScholarshipAvailedFilter.css";
import { MenuItem, TextField } from "@mui/material";

function ScholarshipAvailedFilter({ onFilter, filter }) {
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    onFilter(selectedValue);
  };

  return (
    <div className="filter-container-scholarship">
      <TextField
          id="outlined-select-availed"
          select
          label="Scholarship"
          defaultValue=""
          value={filter}
          onChange={handleFilterChange}
          helperText="Scholarship Availed ?"
        >
          
          <MenuItem  value="">
              Scholarship Availed
            </MenuItem>
            <MenuItem  value="Yes">
              Yes
            </MenuItem>
            <MenuItem  value="No">
              No
            </MenuItem>
        
        </TextField>
      {/* <select
        className="custom-form-selectt form-select"
        aria-label="Default select example"
        value={filter}
        onChange={handleFilterChange}
        id="ScholarshipAvailedInput"
      >
        <option value="">S-ship Availed</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select> */}
    </div>
  );
}

export default ScholarshipAvailedFilter;
