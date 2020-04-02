import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setType] = useState(false);

  const effectHook = () => {
    personService.getAll().then((initialList) => {
      setPersons(initialList);
    });
  };

  useEffect(effectHook, []);

  const notify = (message, error) => {
    setType(error);
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const onNameChange = (e) => {
    setNewName(e.target.value);
  };

  const onNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const submitPerson = (e) => {
    e.preventDefault();
    let exists = false;
    persons.forEach((person) => {
      if (newName === person.name) {
        exists = true;
      }
    });

    if (exists) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirm) {
        const person = persons.find((p) => p.name === newName);
        const changedPerson = { ...person, number: newNumber };
        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : returnedPerson
              )
            );
            notify(`Changed ${person.name}'s number to ${newNumber}`, false);
          })
          .catch(() => {
            notify(
              `Information of ${person.name} has already been removed from the server`,
              true
            );
          });
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(person)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          notify(`Added ${newName}`, false);
          setNewName("");
          setNewNumber("");
        })
        .catch(() => {
          notify(
            `Information of ${person.name} has already been removed from the server`,
            true
          );
        });
    }
  };

  const removePerson = (id, name) => () => {
    const confirm = window.confirm(`Delete ${name}?`);

    if (confirm) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          notify(`${name} succesfully removed.`, false);
        })
        .catch(() => {
          notify(
            `Information of ${name} has already been removed from the server`,
            true
          );
        });
    }
  };

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} error={notificationType} />
      <Filter filter={filter} filterChange={onFilterChange} />
      <PersonForm
        submit={submitPerson}
        nameChange={onNameChange}
        numberChange={onNumberChange}
        name={newName}
        number={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} remove={removePerson} />
    </div>
  );
};

export default App;
