import React from "react";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import BookingForm from "../Components/BookingForm";

function RestaurantsDetails(){
    const { id } = useParams()
    const [restaurant, setRestaurant] = useState(null)
    const [menuItems, setMenuItems] = useState([])

    useEffect(() =>{
        const  fetchRestaurantData = async () => {
            try{
                const restaurantRes = await fetch (`http://localhost:3000/restaurants/${id}`)
                if(!restaurantRes.ok){
                    throw new Error("Failed to fetch restaurant")
                }
                const restaurantData = await restaurantRes.json()
                setRestaurant(restaurantData)

                const menuRes = await fetch(`http://localhost:3000/menuItems?restaurantId=${id}`)
                 if (!menuRes.ok) {
                    throw new Error("Failed to fetch restaurant")
                 }
                 const menuData = await menuRes.json()
                 setMenuItems(menuData)
            }
            catch(error){
                console.error("Error fetching data:", error)
            }
        }
        fetchRestaurantData()
    },[id])
    const handlePreorder = (item) => {
        Navigate("/booking",{state:restaurant,
            preOrderItem:item,
        })
    }
    if (!restaurant) return <p>Loading...</p>
    return(
        <>
        <div>
            <img src={restaurant.image} alt={restaurant.name} 
            className="w-full h-100 0bject-cover rounded-xl" />
            <h1 className=" text-3xl font-bold mt-4">{restaurant.name}</h1>
            <p className="text-gray-500">{restaurant.cuisine} . {restaurant.location}</p>
            <p className="text-orange-500">⭐{restaurant.rating}</p>
            <p className="mt-2 text-xl text-gray-600">{restaurant.description}</p>
<h1 className="text-2xl font-bold mt-8 mb-4">Menu</h1>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{menuItems.map((item) =>(
    <div key={item.id} className="bg-white rounded-xl shadow-md p-4">
        <img src={item.image} alt={item.name} className="w-full h-32 0bject-cover rounded-lg mb-2"/>
        <h3 className="font-bold">{item.name}</h3>
        <p className="">{item.category}</p>
        <p className="text-orange-500">${item.price} <button className="bg-orange-500 text-white px-4 py-2 rounded-lg ml-70">
            Pre-order</button></p>
    </div>
))}</div>


        </div>
            <BookingForm restaurant={restaurant}/>
        </>
    )

}

 
export default RestaurantsDetails;