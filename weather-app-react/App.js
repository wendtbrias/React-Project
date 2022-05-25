import { useEffect, useState } from "react";
import axios from "axios";

const ApiKey = `7499a436d1bb4931855135524213108 `;

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [forecast, setForecast] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const requestApi = async (searchTerm) => {
    const reqData = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${searchTerm}&days=7`
    );
    const { data } = await reqData;
    setWeatherData(data);
    setForecast(data.forecast.forecastday);
    console.log(data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      const { longitude, latitude } = coords;
      requestApi(`${latitude},${longitude}`);
    });
  }, []);

  const searchHandler = (e) => {
    if (e.keyCode == 13) {
      requestApi(`${e.target.value}`);
    }
  };

  if (!weatherData) {
    return (
      <div className="error">
        <h1>No data</h1>
      </div>
    );
  }

  return (
    <div className="weather-container">
      <div
        className={`${
          weatherData?.current?.feelslike_c < 20 ? "cold" : "warm"
        }`}
      >
        <div className="form_search">
          <input
            onKeyUp={searchHandler}
            type="search"
            placeholder="find city"
          />
        </div>
        <div className="weather-information">
          <h1 className="title">{weatherData?.location?.country}</h1>
          <h5 className="sub-title">
            {weatherData?.location?.name},{weatherData?.current?.last_updated}
          </h5>
          <div className="weather_temp">
            <h2>{weatherData?.current?.feelslike_c} &#8451;</h2>
          </div>
          <h2 className="cloud">{weatherData?.current?.condition?.text}</h2>
          <div className="weather_forecast">
            {forecast.length > 0 &&
              forecast.map((data, id) => {
                const { day } = data;
                return (
                  <div className="weather_forecast_item" key={id}>
                    <img src={day?.condition?.icon} />
                    <h4>{day.maxtemp_c}C</h4>
                    <h5 style={{ fontWeight: "400" }}>{data.date}</h5>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
