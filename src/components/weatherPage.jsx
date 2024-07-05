import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WeatherInfo from './weatherInfo';
import Forecast from './forecast';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function WeatherPage() {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = 'de024db4722b5c3363519ef87079fc31';

  useEffect(() => {
    const getGeolocation = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.length === 0) {
          throw new Error('City not found');
        }
        setGeoLocation(data[0]);
        return data[0];
      } catch (error) {
        setError(error.message);
        return null;
      }
    };

    const getWeather = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const getForecast = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setForecast(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchWeatherData = async () => {
      const location = await getGeolocation();
      if (location) {
        const { lat, lon } = location;
        await getWeather(lat, lon);
        await getForecast(lat, lon);
      }
    };

    fetchWeatherData();
  }, [city, API_KEY]);

  function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
  }

  return (
    <div>
      <h1>Weather in {city}</h1>
      {error && <p>Error: {error}</p>}
      {weather && <WeatherInfo weather={weather} />}
      {forecast && <Forecast forecast={forecast} />}
      {geoLocation && (
        <MapContainer
          center={[geoLocation.lat, geoLocation.lon]}
          zoom={10}
          style={{ height: '500px', width: '100%' }}
          key={geoLocation.lat + geoLocation.lon} // Add a key to force re-render
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
          />
          <SetViewOnClick coords={[geoLocation.lat, geoLocation.lon]} />
        </MapContainer>
      )}
    </div>
  );
}

export default WeatherPage;
