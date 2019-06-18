import axios from "axios";

const getAll = () => {
  const request = axios.get("https://restcountries.eu/rest/v2/all");
  return request.then(response => {
    return response.data;
  });
};

const getWeather = capital => {
  /**
   * API key is stored in .env file at the project root directory.
   * To get a response from the API create a .env file in the root directory
   * and write REACT_APP_WEATHER_API_KEY=<your key here>
   * The original file itself is ignored by git.
   * API key from www.apixu.com
   */
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const url = `http://api.apixu.com/v1/current.json?key=${API_KEY}&q=${capital}`;
  const request = axios.get(url);
  return request.then(response => {
    return response.data;
  });
};

export default {
  getAll,
  getWeather
};
