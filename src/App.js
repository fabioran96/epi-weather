import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage';
import WeatherPage from './components/weatherPage';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather/:city" element={<WeatherPage />} />
      </Routes>
    </Container>
  );
}

export default App;


