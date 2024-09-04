import React, { useState } from "react";
import "../App.css";
import { FaSearchPlus } from "react-icons/fa";
import cloud from "../images/Clouds.png";
import rain from "../images/Rain.png";
import clear from "../images/Clear.png";
import mist from "../images/mist.png";
import err from "../images/error.png";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}units=metric";

  const api_key = "a6e24de2c41133e9b643678b84a309fc";
  const handleInput = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };
  const fetchWeatherData = async () => {
    const getData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}&units=metric`
    );
    const jsonData = await getData.json();
    setData(jsonData);
    console.log(jsonData);
    if (search == "") {
      setError("Please enter the city or country name");
    } else if (jsonData.cod == "404") {
      setError("Please enter valid city or country name ");
    } else {
      setError(" ");
    }
  };

  return (
    <>
      <div className="container">
        <div className="inputs">
          <input
            placeholder="Enter city or country"
            onChange={handleInput}
          ></input>
          <button onClick={fetchWeatherData}>
            <FaSearchPlus />
          </button>
        </div>

        {error ? (
          <div className="errorPage">
            <p>{error}</p>
          </div>
        ) : (
          " "
        )}

        {data && data.weather ? (
          <div className="weather">
            <p className="cityName">{data.name} </p>
            <img src={data.weather[0].main == "Clouds" ? cloud : ""} />
            <img src={data.weather[0].main == "Rain" ? rain : ""} />
            <img src={data.weather[0].main == "Clear" ? clear : ""} />
            <img src={data.weather[0].main == "Mist" ? mist : ""} />
            <img src={data.weather[0].main == "Haze" ? cloud : ""} />
            <p className="temperature"> {Math.trunc(data.main.temp)} °C</p>
            <p className="description"> {data.weather[0].description} </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Weather;
