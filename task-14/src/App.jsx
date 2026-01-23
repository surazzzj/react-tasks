import React, { useState } from 'react'

const countries = [
  {
    name: 'India',
    value: 'IN',
    cities: ['Delhi', 'Mumbai']
  },
  {
    name: 'America',
    value: 'AM',
    cities: ['New York', 'Mexico']
  },
  {
    name: 'China',
    value: 'CH',
    cities: ['Shanghai', 'Beijing']
  }
]

const App = () => {

  const [countryIndex, setCountryIndex] = useState('');

  return (
    <div style={{ padding: "50px" }}>

      {/* Country Dropdown */}
      <select
        value={countryIndex}
        onChange={(e) => setCountryIndex(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", fontWeight: "bold" }}
      >
        <option value="">Select Country</option>
        {countries.map((country, index) => (
          <option key={index} value={index}>
            {country.name}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      {countryIndex !== '' && (
        <select style={{ marginLeft: "20px", padding: "10px" }}>
          {countries[countryIndex].cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      )}

    </div>
  )
}

export default App
