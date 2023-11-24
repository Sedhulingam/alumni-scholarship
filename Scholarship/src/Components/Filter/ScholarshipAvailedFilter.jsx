import React from "react";
import "./ScholarshipAvailedFilter.css";

function ScholarshipAvailedFilter({ onFilter, filter }) {
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    onFilter(selectedValue);
  };

  return (
    <div className="filter-container-scholarship">
      <select
        className="custom-form-selectt form-select"
        aria-label="Default select example"
        value={filter}
        onChange={handleFilterChange}
        id="ScholarshipAvailedInput"
      >
        <option value="">S-ship Availed</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
  );
}

export default ScholarshipAvailedFilter;
