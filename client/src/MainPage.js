
import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import FirstPage from './FirstPage';
import CountryTable from './CountryTable';
import Updatepage from './Updatepage';
import './PageCss.css';
import CreatePage from './CreatePage';


const MainPage = () => {
  return (
   <>
   <BrowserRouter>
  <Routes>
    <Route path="/" element={<FirstPage/>}/>
    <Route path="/data" element={<CountryTable/>}/>
    <Route path="/add" element={<CreatePage/>}/>
    <Route path="/update/:countryId" element={<Updatepage />} />

  </Routes>
   </BrowserRouter>
   

   </>
  )
}

export default MainPage;