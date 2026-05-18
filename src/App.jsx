
import React, { useEffect, useState } from "react"
import {  Routes, Route, HashRouter,} from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import "./App.css"
import Home from "./pages/Home"
import Navbar from "./Components/Navbar"
import Restaurants from "./pages/Restaurants"
import RestaurantsDetails from "./pages/RestaurantsDetails"
import Bookings from "./pages/Bookings"
import Login from "./Components/Login"
import { auth } from "./firebase"
import Footer from "./Components/Footer"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
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