import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import Axios
import "./Weather.css";
import WeatherCard from './WeatherCard';

function Temp() {
  const [searchValue, setSearchValue] = useState("kanpur");
  const [temperatureInfo, setTemperatureInfo] = useState({});
  const [error, setError] = useState(null);

  const getWeatherInfo = async () => {
    try {
      let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=3d2ec0ef38c24f892c0f8c1b1fc71f11`;
      const response = await axios.get(weatherUrl);
      
    
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        const { temp, humidity, pressure } = data.main;
        const { main: weatherMood } = data.weather[0];
        const { name } = data;
        const { speed } = data.wind;
        const { country, sunset } = data.sys;
        const myNewWeatherInfo = {
          temp,
          humidity,
          pressure,
          weatherMood,
          name,
          speed,
          country,
          sunset
        }
        setTemperatureInfo(myNewWeatherInfo);
        console.log("myNewWeatherInfo", myNewWeatherInfo);
        setError(null); // Clear any previous errors
      } else {
        setError("City not found. Please enter a valid city name.");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    getWeatherInfo();
  },  );

  return (
    <div>
      <div className='wrap'>
        <div className='search'>
          <input
            type='search'
            placeholder='Please Enter Your City...'
            id='search'
            className='searchTerm'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className='searchButton'
            type='button'
            onClick={getWeatherInfo}
          >
            search
          </button>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      {!error && <WeatherCard tempInfo={temperatureInfo} />}
    </div>
  );
}

export default Temp;
