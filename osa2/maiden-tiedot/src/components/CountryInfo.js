import React, { useEffect, useState } from "react";
import countryService from "../services/countryService";

const CountryInfo = ({ name, capital, population, languages, flag }) => {
  const [weather, setWeather] = useState([]);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    countryService.getWeather(capital).then(response => {
      setWeather(response.current);
      setIcon(response.current.condition.icon);
    });
  }, [capital]);

  const languageList = languages.map(language => (
    <li key={language.iso639_1}>{language.name}</li>
  ));

  return (
    <>
      <div>
        <h1>{name}</h1>
      </div>
      <div>
        <p>Capital: {capital}</p>
        <p>Population: {population}</p>
      </div>
      <div>
        <h2>Languages</h2>
        <ul>{languageList}</ul>
      </div>
      <div>
        <img src={flag} alt={""} height="100" width="150" />
      </div>
      <div>
        <h2>Weather in {capital}</h2>
        <p>
          <span style={{ fontWeight: "bold" }}>
            Temperature: {weather.temp_c} Celsius
          </span>
        </p>
        <img src={icon} alt={""} />
        <p>
          <span style={{ fontWeight: "bold" }}>Wind: </span>
          <span>{weather.wind_kph} Km/h</span>
        </p>
      </div>
    </>
  );
};

export default CountryInfo;
