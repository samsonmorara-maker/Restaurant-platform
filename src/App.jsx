import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Navbar from './Components/Navbar';
import Restaurants from "./pages/Restaurants";
import RestaurantsDetails from './pages/RestaurantsDetails';
import Bookings from './pages/Bookings';

function App() {
 

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Restaurants" element={<Restaurants />} />
        <Route path="/Restaurants/:id" element={<RestaurantsDetails />} />
        <Route path="/Bookings" element={<Bookings />} />
      </Routes>
      </BrowserRouter>

           
    </>
  )
}

export default App



