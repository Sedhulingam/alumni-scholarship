import React, { useState } from "react";

function NameFilter({ onFilter, filter }) {
  const handleFilterChange = (event) => {
    const text = event.target.value;
    console.log(text);
    onFilter(text);
  };

  return (
    <div className="form-floating mb-3">
      <input
        type="text"
        className="filter-input form-control"
        placeholder="Name"
        id="floatingInput"
        value={filter}
        onChange={handleFilterChange}
        style={{ width: "120px" }}
      />
      <label htmlFor="floatingInput">Name</label>
    </div>
  );
}

export default NameFilter;
