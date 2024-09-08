import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import { BiSearch } from 'react-icons/bi';
import { WiDayCloudy, WiThermometer, WiHumidity, WiStrongWind, WiBarometer, WiTornado, WiFog, WiSunrise, WiSunset } from 'react-icons/wi';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '73609331e7ad67d7f53525aca05dd90b';

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (error) {
      console.error(error);
      setWeatherData(null);
      setError(error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  const convertUnixToTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-[#1b1b1b] flex flex-col items-center p-5 text-white">
      {/* Header */}
      <header className="w-full max-w-6xl mb-8">
        <div className="flex flex-col md:flex-row md:justify-between items-center p-4 bg-[#2a2a2a] rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4 md:mb-0 text-teal-400">🌤 Weatherly</h1>
          <form onSubmit={handleSearch} className="flex items-center w-full md:w-auto">
            <input
              type="text"
              className="bg-transparent border border-gray-700 p-2 rounded-l-md focus:outline-none text-white w-full md:w-48"
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-500 p-3 rounded-r-lg flex items-center transition duration-300 ease-in-out"
            >
              <BiSearch size={20} className="text-white" />
            </button>
          </form>
        </div>
      </header>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Weather Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        <WeatherCard
          title="Weather Condition"
          value={weatherData ? weatherData.weather[0].main : ''}
          icon={<WiDayCloudy size={48} className="text-blue-400" />}
        />
        <WeatherCard
          title="Temperature"
          value={weatherData ? `${weatherData.main.temp} °C` : ''}
          icon={<WiThermometer size={48} className="text-yellow-400" />}
        />
        <WeatherCard
          title="Humidity"
          value={weatherData ? `${weatherData.main.humidity} %` : ''}
          icon={<WiHumidity size={48} className="text-green-400" />}
        />
        <WeatherCard
          title="Wind Speed"
          value={weatherData ? `${weatherData.wind.speed} m/s` : ''}
          icon={<WiStrongWind size={48} className="text-blue-500" />}
        />
        <WeatherCard
          title="Feels Like"
          value={weatherData ? `${weatherData.main.feels_like} °C` : ''}
          icon={<WiBarometer size={48} className="text-purple-400" />}
        />
        <WeatherCard
          title="Cloudiness"
          value={weatherData ? `${weatherData.clouds.all} %` : ''}
          icon={<WiDayCloudy size={48} className="text-gray-400" />}
        />

        {/* Additional Info Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <div className="bg-[#2a2a2a] p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <WeatherCard
                title="Pressure"
                value={weatherData ? `${weatherData.main.pressure} hPa` : ''}
                icon={<WiTornado size={48} className="text-red-400" />}
              />
              <WeatherCard
                title="Visibility"
                value={weatherData ? `${weatherData.visibility / 1000} km` : ''}
                icon={<WiFog size={48} className="text-white" />}
              />
              <WeatherCard
                title="Sunrise"
                value={weatherData ? convertUnixToTime(weatherData.sys.sunrise) : ''}
                icon={<WiSunrise size={48} className="text-orange-400" />}
              />
              <WeatherCard
                title="Sunset"
                value={weatherData ? convertUnixToTime(weatherData.sys.sunset) : ''}
                icon={<WiSunset size={48} className="text-pink-400" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
