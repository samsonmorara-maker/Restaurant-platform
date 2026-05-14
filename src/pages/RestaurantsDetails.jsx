import React from "react";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

function RestaurantsDetails(){
    const { id } = useParams()
    const [restaurant, setRestaurant] = useState(null)
    const [menuItems, setMenuItems] = useState([])

    useEffect(() =>{
        const  fetchRestaurantData = async () 
        => {
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
    if (!restaurant) return <p>Loading...</p>
    return(
        <>

        </>
    )

}

 
export default RestaurantsDetails;