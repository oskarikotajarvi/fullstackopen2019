import React from "react";

const Persons = ({ persons, remove }) => {
  const personList = persons.map(person => (
    <p key={person.name}>
      {person.name} {person.number}{" "}
      <button onClick={remove(person.id, person.name)}>Delete</button>
    </p>
  ));

  return <>{personList}</>;
};

export default Persons;
