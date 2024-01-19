import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdatePage() {
  const navigate = useNavigate();
  const { countryId } = useParams();

  const [country, setCountry] = useState('');
  const [capital, setCapital] = useState('');
  const [prevCountry, setPrevCountry] = useState('');
  const [prevCapital, setPrevCapital] = useState('');

  useEffect(() => {
    // Fetch existing country details based on countryId
    axios.get(`http://localhost:4000/updatecountry/${countryId}`)
      .then((response) => {
        console.log(response.data)
        const { country, capital } = response.data;
        setPrevCountry(country);
        setPrevCapital(capital);
        setCountry(country || '');
        setCapital(capital || '');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [countryId]);

  const handleUpdate = () => {
    if (!country || !capital) {
      console.error('Country and Capital are required');
      return;
    }

    // Make a PUT request to update data
    axios.put(`http://localhost:4000/updatecountry/${countryId}`, { country, capital })
      .then((response) => {
        console.log('Data updated successfully:', response.data[0]);
        setPrevCapital(response.data.prevCapital)
        // Optionally, you can navigate to another page after updating data
        navigate('/data');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  useEffect(() => {
    console.log('prevCountry:', prevCountry);
    console.log('prevCapital:', prevCapital);
  }, [prevCountry, prevCapital]);

  return (
    <div>
      <div className='centerbox'>
      
        <div>
          <label>New Country Name :</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div>
          <label>New Capital Name :</label>
          <input type="text" value={capital} onChange={(e) => setCapital(e.target.value)} />
        </div>
        <div className='btn'>
          <button className='addupbtn' onClick={handleUpdate}>Update</button>
          <button className='cancelbtn' onClick={() => navigate('/data')}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePage;
