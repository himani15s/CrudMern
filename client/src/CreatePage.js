import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePage() {
  const navigate = useNavigate();
  const [country, setCountry] = useState('');
  const [capital, setCapital] = useState('');

  const handleAdd = () => {
    // Make a POST request to save data
    axios.post('http://localhost:4000/createcountry', { country, capital })
      .then((response) => {
        console.log('Data added successfully:', response.data);
        // Optionally, you can navigate to another page after adding data
        navigate('/data');
      })
      .catch((error) => {
        console.error('Error adding data:', error);
      });
  };

  return (
    <div>
      <div className='centerbox'>
        <div>
          <label>Country Name :</label>
          <input type="text" onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div>
          <label>Capital Name :</label>
          <input type="text" onChange={(e) => setCapital(e.target.value)} />
        </div>
        <div className='btn'>
          <button className='addupbtn' onClick={handleAdd}>Add</button>
          <button className='cancelbtn' onClick={() => navigate('/data')}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
