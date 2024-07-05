import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

function Forecast({ forecast }) {
  // Filtra per ottenere un intervallo di 24 ore per i prossimi 5 giorni
  const filteredForecast = forecast.list.filter((_, index) => index % 8 === 0);

  return (
    <div>
      <h2>5 Day Forecast</h2>
      <Row>
        {filteredForecast.map((item) => (
          <Col key={item.dt} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{new Date(item.dt * 1000).toLocaleDateString()}</Card.Title>
                <Card.Text>
                  Temperature: {item.main.temp}°C
                </Card.Text>
                <Card.Text>
                  Conditions: {item.weather[0].description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Forecast;
