import React from "react";

const Country = ({ name, showInfo }) => {
  return (
    <p>
      {name} <button onClick={() => showInfo(name)}>Show</button>
    </p>
  );
};

export default Country;
