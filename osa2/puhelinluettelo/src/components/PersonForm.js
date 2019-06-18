import React from "react";

const PersonForm = ({ submit, nameChange, name, numberChange, number }) => {
  return (
    <>
      <h3>Add a new</h3>
      <form onSubmit={submit}>
        <div>
          <label>Name: </label>
          <input value={name} onChange={nameChange} />
        </div>
        <div>
          <label>Number: </label>
          <input value={number} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
