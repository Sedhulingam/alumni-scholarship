import React from "react";
import "./Physically.css";

function Physically({ onFilter, filter }) {
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    onFilter(selectedValue);
  };

  return (
    <div className="filter-container-physically">
      <select
        className="custom-form-selection form-select"
        aria-label="Default select example"
        value={filter}
        onChange={handleFilterChange}
        id="Physically"
      >
        <option value="">Diff-abled</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
  );
}

export default Physically;
