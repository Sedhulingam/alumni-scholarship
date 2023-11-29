import { MenuItem, TextField } from '@mui/material'
import React from 'react'

const ScholarshipName = ( { onFilter, filter } ) => {
    const handleFilterChange = (event) => {
        const selectedValue = event.target.value;
        onFilter(selectedValue);
      };    
  return (
    <div className="filter-container-scholarship-name">
       <TextField
          id="outlined-select-availed"
          select
          label="Scholarship Name"
          defaultValue=""
          value={filter}
          onChange={handleFilterChange}
          helperText="Select Scholarship Name"
        >
          
          <MenuItem  value="">
              Scholarship Name
            </MenuItem>
            <MenuItem  value="FFE">
              FFE
            </MenuItem>
            <MenuItem  value="Community">
              Community
            </MenuItem>
            <MenuItem  value="Pragathi">
              Pragathi
            </MenuItem>
            <MenuItem  value="94Gct">
              94Gct
            </MenuItem>
            <MenuItem  value="Alumini">
              Alumini
            </MenuItem>
            <MenuItem  value="Siemens">
              Siemens
            </MenuItem>
        
        </TextField>
    </div>
  )
}

export default ScholarshipName
