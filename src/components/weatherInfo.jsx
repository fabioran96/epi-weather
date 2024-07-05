import React from 'react';
import { Card } from 'react-bootstrap';

function WeatherInfo({ weather }) {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Current Weather in {weather.name}</Card.Title>
        <Card.Text>
          Temperature: {weather.main.temp}°C
        </Card.Text>
        <Card.Text>
          Conditions: {weather.weather[0].description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default WeatherInfo;
