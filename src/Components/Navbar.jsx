import React,{ useState } from "react";
import { Link } from "react-router-dom";


function Navbar(){
    const [toggle, setToggle]= useState(false);


    return(
    <nav className="bg-orange-500 p-3 flex justify-between items-center relative">
        <h1 className="text-3xl font-bold">🍽️TastyBites</h1>
        <button className="md:hidden text-3xl"
        onClick={() => setToggle(!toggle)}
        >{toggle ? "x" : "☰"}</button>
        <div className="hidden md:flex gap-6 text-2l font-medium">
            <Link to="/">Home</Link>
            <Link to="/restaurants">Restaurants</Link>
            <Link to="/bookings">My Bookings</Link>
        </div>
        {toggle && (
            <div className="absolute top-12 right-0 z-50 w-1/2  flex flex-col gap-4 mt-4 font-medium md:hidden bg-orange-500 p-4 border rounded-xl border-0 h-40 ">
            <Link to="/" onClick={() => setToggle(false)}>Home</Link>
            <Link to="/Restaurants" onClick={() => setToggle(false)}>Restaurants</Link>
            <Link to="/Bookings" onClick={() => setToggle(false)}>My Bookings</Link>
        </div>
        ) }
    </nav>
    )
}

export default Navbar;