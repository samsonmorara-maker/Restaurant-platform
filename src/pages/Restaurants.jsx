import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Restaurants(){
    const [restaurants, setRestaurants]= useState([])


    useEffect (() =>{
        async function fecthRestaurants() {
            try {
       const response= await fetch("http://localhost:3000/restaurants")
       if(!response.ok){
        throw new Error("Failed to fecth restaurants")
       }
       const data = await response.json()
       setRestaurants(data)
        }catch (error){console.log(error.message)}
    }
    fecthRestaurants()},[])

    return(
       <>
       <div>
        <h1 className="text-3xl font-bold mb-6 ml-4">All Restaurants</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {restaurants.map((restaurant) => ( 
                <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                    <div className="bg-white rounded-xl shadow-md">
                        <img src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-48 object-cover rounded-t-xl"/>
                        <div p-6>
                            <h2 className="text-xl font-bold">{restaurant.name}</h2>
                            <p className="text-gray-700">{restaurant.cuisine}</p>
                            <p className="text-gray-400">{restaurant.location}</p>
                            <p className="text-orange-500 font-bold mt-2" >⭐{restaurant.rating}</p>
                        </div>
                    </div>
                </Link>
            ))}</div>
       </div>

       </> 
    );
}

export default Restaurants;