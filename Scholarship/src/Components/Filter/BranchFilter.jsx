import React, { useState } from "react";
import "./BranchFilter.css";
import { MenuItem, TextField } from "@mui/material";

function BranchFilter({ onFilter, filter }) {
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    onFilter(selectedValue);
  };

  return (
    <div className="filter-container-branch">
      <TextField
        id="outlined-select-currency"
        select
        label="Department"
        defaultValue=""
        value={filter}
        onChange={handleFilterChange}
        helperText="Please select your Department"
      >
        <MenuItem value="">Department</MenuItem>
        <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
        <MenuItem value="Mechanical Engineering">
          Mechanical Engineering
        </MenuItem>
        <MenuItem value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</MenuItem>
        <MenuItem value="Electronics & Communication Engineering">Electrical & Communication Engineering</MenuItem>
        <MenuItem value="Production Engineering">Production Engineering</MenuItem>
        <MenuItem value="Electronics & Instrumentation Engineering">Electronics & Instrumentation Engineering</MenuItem>
        <MenuItem value="Computer Science & Engineering">Computer Science & Engineering</MenuItem>
        <MenuItem value="Industrial Biotechnology">Industrial Biotechnology</MenuItem>
        <MenuItem value="Information Technology">Information Technology</MenuItem>
        <MenuItem value="Structural Engineering">Structural Engineering</MenuItem>
        <MenuItem value="Environmental Engineering">Environmental Engineering</MenuItem>
        <MenuItem value="Geotechnical Engineering">Geotechnical Engineering</MenuItem>
        <MenuItem value="Manufacturing Engineering">Manufacturing Engineering</MenuItem>
        <MenuItem value="Thermal Engineering">Thermal Engineering</MenuItem>
        <MenuItem value="Engineering Design">Engineering Design</MenuItem>
        <MenuItem value="Power Systems Engineering">Power Systems Engineering</MenuItem>
        <MenuItem value="Power Electronics & Drives">Power Electronics & Drives</MenuItem>
        <MenuItem value="Applied Electronics">Applied Electronics</MenuItem>
        <MenuItem value="VLSI designx">VLSI designx</MenuItem>
        

      </TextField>

      {/* <select
        className="custom-form-select form-select"
        aria-label="Default select example"
        value={filter}
        onChange={handleFilterChange}
        id="BranchInput"
      >
        <option value="">Branch</option>
        <option value="Civil Engineering">Civil Engineering</option>
        <option value="Mechanical Engineering">Mechanical Engineering</option>
        <option value="Electrical & Electronics Engineering">
          Electrical & Electronics Engineering
        </option>
        <option value="Electronics & Communication Engineering">
          Electronics & Communication Engineering
        </option>
        <option value="Production Engineering"> Production Engineering </option>
        <option value="Electronics & Instrumentation Engineering">
          {" "}
          Electronics & Instrumentation Engineering{" "}
        </option>
        <option value="Computer Science & Engineering">
          Computer Science & Engineering{" "}
        </option>
        <option value="Information Technology"> Information Technology </option>
        <option value="Industrial Biotechnology">
          Industrial Biotechnology
        </option>
        <option value="Structural Engineering">Structural Engineering</option>
        <option value="Environmental Engineering ">
          Environmental Engineering{" "}
        </option>
        <option value="Geotechnical Engineering ">
          Geotechnical Engineering{" "}
        </option>
        <option value="Engineering Design">Engineering Design </option>
        <option value="Manufacturing Engineering">
          Manufacturing Engineering{" "}
        </option>
        <option value="Thermal Engineering">Thermal Engineering</option>
        <option value="Power Systems Engineering">
          {" "}
          Power Systems Engineering{" "}
        </option>
        <option value="Power Electronics & Drives">
          Power Electronics & Drives{" "}
        </option>
        <option value="Applied Electronics">Applied Electronics </option>
        <option value="VLSI designx">VLSI design </option>
      </select> */}
    </div>
  );
}

export default BranchFilter;
