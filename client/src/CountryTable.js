import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CountryTable = () => {
  const navigate = useNavigate();

  const [country, setCountry] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/getcountry')
      .then(response => {
        console.log(response);
        setCountry(response.data);
      })
      .catch((error) => console.log(error));

  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this country?');

    if (isConfirmed) {
      axios.delete(`http://localhost:4000/deletecountry/${id}`)
        .then(response => {
          console.log('Deleted data:', response.data);
          setCountry(country.filter(item => item._id !== id));
          alert('Data deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting data:', error);
        });
    } else {
      alert('Deletion canceled!');
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className='tablepage'>
      <div className='btnsection'>
        <button className='addbtn' onClick={() => navigate("/add")}>Add County</button>
        <button className='homebtn' onClick={() => navigate("/")}>Home</button>
      </div>

      <div className='datatable'>
        <table>
          <thead>
            <h3>List of countries</h3>
            <tr>
              <th>Country</th>
              <th>Capital</th>
            </tr>
          </thead>
          <tbody>
            {country.map((data) => (
              <tr key={data._id}>
                <td>{data.country}</td>
                <td>{data.capital}</td>
                <td><button className='editbtn' onClick={() => handleEdit(data._id)}>Edit</button></td>
                <td><button className='deletebtn' onClick={() => handleDelete(data._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryTable;
