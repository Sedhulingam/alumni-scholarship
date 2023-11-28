import { TextField } from "@mui/material";
import React, { useState } from "react";

function NameFilter({ onFilter, filter }) {
  const handleFilterChange = (event) => {
    const text = event.target.value;
    console.log(text);
    onFilter(text);
  };

  return (
    <div className="form-floating mb-3">
      <TextField id="outlined-basic" label="Name" variant="outlined" value={filter} onChange={handleFilterChange} sx={{width: '100px'}}/>
      {/* <input
        type="text"
        className="filter-input form-control"
        placeholder="Name"
        id="floatingInput"
        value={filter}
        onChange={handleFilterChange}
        style={{ width: "120px" }}
        title="Name"
      />
      <label htmlFor="floatingInput">Name</label> */}
    </div>
  );
}

export default NameFilter;
