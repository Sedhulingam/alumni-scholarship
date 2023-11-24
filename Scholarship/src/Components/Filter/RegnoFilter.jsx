import React, { useState } from "react";
// import "./RegnoFilter.css";
import "bootstrap/dist/css/bootstrap.min.css";

function RegnoFilter({ onFilter, filter }) {
  const handleFilterChange = (event) => {
    const text = event.target.value.toLowerCase();
    onFilter(text);
  };

  return (
    <div className="form-floating mb-3">
      <input
        type="email"
        className="filter-input form-control"
        placeholder="Reg No"
        id="floatingInput"
        value={filter}
        onChange={handleFilterChange}
        style={{ width: "120px" }}
      />
      <label htmlFor="floatingInput">Reg No</label>
    </div>
  );
}

export default RegnoFilter;
