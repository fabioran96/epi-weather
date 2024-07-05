import React from 'react';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog } from 'react-icons/wi';
import './forecast.css';

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

const groupByDay = (list) => {
  const days = {};
  list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    if (!days[day]) {
      days[day] = [];
    }
    days[day].push(item);
  });
  return days;
};

const calculateDailyHighLow = (dayData) => {
    const temps = dayData.map(item => item.main.temp);
    const tempMax = Math.max(...temps);
    const tempMin = Math.min(...temps);
    const condition = dayData[0].weather[0].main;
    return {
      date: new Date(dayData[0].dt * 1000).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      tempMax: Math.round(tempMax),
      tempMin: Math.round(tempMin),
      condition,
      description: dayData[0].weather[0].description,
    };
  };
  

const Forecast = ({ forecast, colors }) => {
  if (!forecast || !forecast.list || forecast.list.length === 0) {
    return <div>No forecast data available.</div>;
  }

  const days = groupByDay(forecast.list);
  const dailyForecasts = Object.values(days).map(calculateDailyHighLow);

  return (
    <div className="forecast">
      {dailyForecasts.slice(0, 5).map((day, index) => (
        <div
          key={index}
          className="forecast-day"
          style={{ backgroundColor: colors[index % colors.length] }}
        >
          <div className="forecast-date">{day.date}</div>
          <div className="forecast-icon">{getWeatherIcon(day.condition)}</div>
          <div className="forecast-temp">
            <span className="temp-max">Max: {day.tempMax}°C</span>
            <span className="temp-min">Min: {day.tempMin}°C</span>
          </div>
          <div className="forecast-desc">{day.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
