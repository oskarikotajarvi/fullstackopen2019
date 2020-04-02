import React from "react";

const Filter = ({ filter, filterChange }) => {
  return (
    <div>
      <label>Filter shown with </label>
      <input value={filter} onChange={filterChange} />
    </div>
  );
};

export default Filter;
