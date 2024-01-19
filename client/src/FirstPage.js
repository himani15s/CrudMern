import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [capital, setCapital] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/getcountry')
      .then(response => {
        console.log(response);
        setCountry(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCountryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCountry(selectedValue);

    // Find the selected country object from the country array
    const selectedCountryObject = country.find(countryItem => countryItem.country === selectedValue);

    // Update the capital state based on the selected country
    if (selectedCountryObject) {
      setCapital(selectedCountryObject.capital);
    } else {
      setCapital('');
    }
  };

  return (
    <div>
      <div className='SelectCountryBox'>
        <button className='Managebtn' onClick={() => navigate("/data")}>Manage</button>
        <select id="countrySelect" onChange={handleCountryChange} value={selectedCountry}>
          <option value="" defaultValue disabled>
            Select Country
          </option>
          {country.map(countryItem => (
            <option key={countryItem._id} value={countryItem.country}>
              {countryItem.country}
            </option>
          ))}
        </select>
        <h3>Capital: {capital}</h3>
      </div>
    </div>
  );
};

export default FirstPage;
