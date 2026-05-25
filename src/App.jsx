
import React, { useEffect, useState, lazy } from "react"

import {  Routes, Route, HashRouter, Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import "./App.css"
import Home from "./pages/Home"
import Navbar from "./Components/Navbar"
import RestaurantsDetails from "./pages/RestaurantsDetails"
import Bookings from "./pages/Bookings"
import Login from "./Components/Login"
import { auth } from "./firebase"
import Footer from "./Components/Footer"
import Logout from "./Components/Logout"
import AdminRoute from "./Components/AdminRoute"

// lazy loading
const Restaurants = React.lazy (()=> import("./pages/Restaurants"))
const RestaurantDetails = React.lazy(()=> import("./pages/RestaurantsDetails"))
const Booking = React.lazy(()=> import("./pages/Bookings"))
const Dashboard = React.lazy(()=> import("./pages/Dashboard"))
function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const currentUser = auth.currentUser
  const isAdmin = currentUser?.email === "samsonmorara@gmail.com"
  useEffect(() => {
    const unsubscribe = onAuthStateChanged( auth,(currentUser) => {
        setUser(currentUser)
        setLoading(false)
      }
    )
    return () => unsubscribe()
  }, [])
  if (loading) return <p className="text-center mt-20">Loading ....</p>
  if (!user) return <Login />
  return (
    <HashRouter>

      
      <Navbar user={user} />

      <Routes>
        <Route path="/admin" element={<AdminRoute user={{isAdmin}}><Dashboard /></AdminRoute>}/>
        <Route path ="/login" element={ <Login />} />
        <Route path="/" element={user ?<Home /> :  < Navigate to="/Login "/>} />
        <Route path="/restaurants"element={ user ? <Restaurants /> : <Login />}/>
        <Route path="/restaurants/:id" element={<RestaurantsDetails />}/>
        <Route path="/bookings"element={user ? (<Bookings user={user} />) : ( <Login />)}/>
        <Route path="/auth"element={<Login />}/>
      </Routes>
      <Footer />
    </HashRouter>
  )}
export default App