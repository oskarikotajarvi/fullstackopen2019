import React, { useEffect, useState } from "react";
import Countries from "./components/Countries";
import Filter from "./components/Filter";
import countryService from "./services/countryService";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countryService.getAll().then(response => {
      setCountries(response);
    });
  }, []);

  const onFilterChange = e => {
    setFilter(e.target.value);
  };

  const countriesToShow =
    filter === ""
      ? countries
      : countries.filter(country =>
          country.name.toLowerCase().includes(filter.toLowerCase())
        );

  const onShowClick = name => {
    setFilter(name);
  };

  return (
    <div>
      <Filter value={filter} modifier={onFilterChange} />
      <Countries countries={countriesToShow} onShowClick={onShowClick} />
    </div>
  );
};

export default App;
