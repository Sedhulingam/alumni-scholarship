import React from "react";
import "./Physically.css";
import { MenuItem, TextField } from "@mui/material";

function Physically({ onFilter, filter }) {
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    onFilter(selectedValue);
  };

  return (
    <div className="filter-container-physically">
      <TextField
          id="outlined-select-physically"
          select
          label="Disability"
          defaultValue=""
          value={filter}
          onChange={handleFilterChange}
          helperText="Physically Challenged ?"
        >
          
            
            <MenuItem  value="Yes">
              Yes
            </MenuItem>
            <MenuItem  value="No">
              No
            </MenuItem>
        
        </TextField>
      {/* <select
        className="custom-form-selection form-select"
        aria-label="Default select example"
        value={filter}
        onChange={handleFilterChange}
        id="Physically"
      >
        <option value="">Diff-abled</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select> */}
    </div>
  );
}

export default Physically;
