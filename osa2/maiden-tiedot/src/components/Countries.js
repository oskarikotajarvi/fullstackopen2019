import React from "react";
import Country from "./Country";
import CountryInfo from "./CountryInfo";

const Countries = ({ countries, onShowClick }) => {
  let countryView;

  if (countries.length > 10) {
    countryView = <p>Too many matches, specify another filter</p>;
  }

  if (countries.length <= 10 && countries.length > 1) {
    countryView = countries.map(country => (
      <Country
        key={country.numericCode}
        name={country.name}
        showInfo={onShowClick}
      />
    ));
  }

  if (countries.length === 1) {
    const country = countries[0];
    countryView = (
      <CountryInfo
        name={country.name}
        capital={country.capital}
        population={country.population}
        languages={country.languages}
        flag={country.flag}
      />
    );
  }

  return <div>{countryView}</div>;
};

export default Countries;
