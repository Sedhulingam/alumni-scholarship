import React from "react";
import "./ProgrammeFilter.css";

function ProgrammeFilter({ onFilter, filter }) {
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    onFilter(selectedValue);
  };

  return (
    <div className="filter-container-programme">
      <select
        className="custom-form-selecting form-select"
        aria-label="Default select example"
        value={filter}
        onChange={handleFilterChange}
        id="ProgrammeInput"
      >
        <option value="">Programme</option>
        <option value="UG">UG</option>
        <option value="PG">PG</option>
      </select>
    </div>
  );
}

export default ProgrammeFilter;
