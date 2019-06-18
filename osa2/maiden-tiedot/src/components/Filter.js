import React from "react";

const Filter = ({ value, modifier }) => {
  return (
    <div>
      <label>Find countries </label>
      <input value={value} onChange={modifier} />
    </div>
  );
};

export default Filter;
