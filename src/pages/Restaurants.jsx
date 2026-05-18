import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
function Restaurants(){
    const [restaurants, setRestaurants]= useState([])
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [menuItems, setMenuItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect (() =>{
        async function fecthRestaurants() {
            try {
       const response= await fetch("https://restaurant-platform-cr7r.onrender.com/restaurants")
       if(!response.ok){
        throw new Error("Failed to fecth restaurants")
       }
       const data = await response.json()
       setRestaurants(data)
       setFilteredRestaurants(data)
        }catch (error){console.log(error.message)}
        finally{
            setLoading(false)
        }
    }
    fecthRestaurants()},[])
    if (loading)return <p className="text-center mt-20">Loading ....</p>

    return(
       <>
       <div>
        <SearchBar restaurants={restaurants}  setFilteredRestaurants={setFilteredRestaurants}/>
        <h1 className="text-3xl font-bold mb-6 ml-4">All Restaurants</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {filteredRestaurants.map((restaurant) => ( 
                <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                    <div className="bg-white rounded-xl shadow-md">
                        <img src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-50 object-cover rounded-t-xl"/>
                        <div>
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