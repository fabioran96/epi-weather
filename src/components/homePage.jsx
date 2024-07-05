import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, ListGroup } from 'react-bootstrap';

function HomePage() {
  const [city, setCity] = useState('');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
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

  return (
    <div>
      <h1>Weather App</h1>
      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Group controlId="cityInput">
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Get Weather
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => addToFavorites(city)}
          className="ml-2"
        >
          Add to Favorites
        </Button>
      </Form>
      <h2>Favorites</h2>
      <ListGroup>
        {favorites.map((fav, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => navigate(`/weather/${fav}`)}
          >
            {fav}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default HomePage;
