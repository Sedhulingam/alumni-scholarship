import React from "react";
import "./GenderFilter.css";

function GenderFilter({ onFilter, filter }) {
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    onFilter(selectedValue);
  };

  return (
    <div className="filter-container-gender">
      <select
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
      </select>
    </div>
  );
}

export default GenderFilter;
