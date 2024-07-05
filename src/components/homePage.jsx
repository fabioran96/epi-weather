import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup, Card, ListGroup } from 'react-bootstrap';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog } from 'react-icons/wi';
import './homePage.css'; 

function HomePage() {
  const [city, setCity] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const navigate = useNavigate();
  const API_KEY = 'de024db4722b5c3363519ef87079fc31';

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);

    const fetchWeatherData = async () => {
      const data = {};
      for (const fav of savedFavorites) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${fav}&appid=${API_KEY}&units=metric`
        );
        if (response.ok) {
          const weather = await response.json();
          data[fav] = weather;
        }
      }
      setWeatherData(data);
    };

    if (savedFavorites.length > 0) {
      fetchWeatherData();
    }
  }, []);


  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      navigate(`/weather/${city}`);
    }
  };

  const addToFavorites = (city) => {
    if (city && !favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny />;
      case 'Clouds':
        return <WiCloud />;
      case 'Rain':
        return <WiRain />;
      case 'Snow':
        return <WiSnow />;
      case 'Fog':
      case 'Mist':
        return <WiFog />;
      default:
        return <WiDaySunny />;
    }
  };


  return (
    <div className="homepage">
      <h1 className="homepage-title">iOS Weather App</h1>
      <Form onSubmit={handleSearch} className="search-form mb-4">
        <InputGroup>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="search-input"
          />
          <Button variant="secondary" type="submit" className="search-button">Search</Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => addToFavorites(city)}
            className="add-favorite-button ml-2"
          >
            Add to Favorites
          </Button>
        </InputGroup>
      </Form>
      <h2 className="favorites-title">Favorites</h2>
      <ListGroup className="favorites-list">
        {favorites.map((fav, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => navigate(`/weather/${fav}`)}
            className="favorite-item"
          >
            <div className="favorite-item-content">
              <h5>{fav}</h5>
              {weatherData[fav] && (
                <div className="weather-info">
                  {getWeatherIcon(weatherData[fav].weather[0].main)}
                  <p>{weatherData[fav].main.temp}°C</p>
                  <p>{weatherData[fav].weather[0].description}</p>
                </div>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );


    
}

export default HomePage;
