import React from "react";
import { Link } from "react-router-dom";


function Navbar(){


    return(
    <nav className="bg-orange-500 p-3">
        <h1 className="text-3xl font-bold">🍽️TastyBites</h1>
        <div>
            <Link to="/">Home</Link>
        </div>
        
    </nav>
    )
}

export default Navbar;