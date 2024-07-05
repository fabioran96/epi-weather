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

  const colors = ['#753b4f', '#9fa197', '#8ca79b', '#c3bb8f', '#46bfa6'];


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
        return <WiDaySunny size={50} />;
      case 'Clouds':
        return <WiCloud size={50} />;
      case 'Rain':
        return <WiRain size={50} />;
      case 'Snow':
        return <WiSnow size={50} />;
      case 'Fog':
      case 'Mist':
        return <WiFog size={50} />;
      default:
        return <WiDaySunny size={50} />;
    }
  };

  return (
    <div className="homepage">
      <h1 className="homepage-title">EpiWeather </h1>
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
            style={{ backgroundColor: colors[index % colors.length] }} 
          >
            <div className="favorite-item-content">
              <div className="text-content">
                <h5>{fav}</h5>
                {weatherData[fav] && (
                  <>
                    <p className="temperature">{weatherData[fav].main.temp}°C</p>
                    <p className="description">{weatherData[fav].weather[0].description}</p>
                  </>
                )}
              </div>
              <div className="icon-content">
                {weatherData[fav] && getWeatherIcon(weatherData[fav].weather[0].main)}
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );

    
}

export default HomePage;
