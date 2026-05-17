/* import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Navbar from './Components/Navbar';
import Restaurants from "./pages/Restaurants";
import RestaurantsDetails from './pages/RestaurantsDetails';
import Bookings from './pages/Bookings';
import AuthForm from "./components/AuthForm"


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

 */
import React, { useEffect, useState } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import { onAuthStateChanged } from "firebase/auth"

import "./App.css"

import Home from "./pages/Home"
import Navbar from "./Components/Navbar"
import Restaurants from "./pages/Restaurants"
import RestaurantsDetails from "./pages/RestaurantsDetails"
import Bookings from "./pages/Bookings"
import Login from "./Components/Login"

import { auth } from "./firebase"

function App() {

  // STORE LOGGED IN USER
  const [user, setUser] = useState(null)

  // CHECK AUTH STATE
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser)
      }
    )

    return () => unsubscribe()

  }, [])

  return (
    <BrowserRouter>

      
      <Navbar user={user} />

      <Routes>
        <Route path ="/login" element={ <Login />} />
        <Route path="/" element={user ?<Home /> : <Login />} />
        <Route path="/restaurants"element={ user ? <Restaurants /> : <Login />}/>
        <Route path="/restaurants/:id" element={<RestaurantsDetails />}/>
        <Route path="/bookings"element={user ? (<Bookings user={user} />) : ( <Login />)}/>
        <Route path="/auth"element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )}
export default App