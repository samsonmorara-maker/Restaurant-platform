
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
  const [user, setUser] = useState(null)
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