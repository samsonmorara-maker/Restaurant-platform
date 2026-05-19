
import { useEffect, useState } from "react"
import { auth } from "../firebase"
 function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders")
  const [orders, setOrders] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const demoRestaurants = [
      {
        id: 1,
        name: "Pizza Palace",
        category: "Italian",
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
        rating: 4.8,
      },
      {
        id: 2,
        name: "Burger Hub",
        category: "Fast Food",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
        rating: 4.5,
      },
    ]
    const demoOrders = [
      {
        id: 1,
        restaurant: "Pizza Palace",
        meal: "Pepperoni Pizza",
        price: 18,
        status: "Confirmed",
        date: "19 May 2026",
      },
      {
        id: 2,
        restaurant: "Burger Hub",
        meal: "Chicken Burger",
        price: 12,
        status: "Preparing",
        date: "18 May 2026",
      },
    ]
    setRestaurants(demoRestaurants)
    setOrders(demoOrders)
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }, [])
  if (loading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">
            Welcome Back  </h1>
          <p className="text-orange-100">
            Manage your restaurant bookings and favorite restaurants.</p>
          <div className="grid sm:grid-cols-3 gap-5 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <h2 className="text-3xl font-bold">{orders.length}</h2>
              <p className="text-sm text-orange-100 mt-1">
                Total Orders  </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <h2 className="text-3xl font-bold">{restaurants.length}</h2>
              <p className="text-sm text-orange-100 mt-1">
                Favorite Restaurants</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <h2 className="text-3xl font-bold">
                {auth.currentUser?.displayName
                  ? auth.currentUser.displayName.split(" ")[0]
                  : "User"}
              </h2>
              <p className="text-sm text-orange-100 mt-1">
                Logged In User </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === "orders"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-600 border"
            }`}>My Orders</button>
          <button
            onClick={() => setActiveTab("restaurants")}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === "restaurants"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-600 border"
            }`}>Restaurants </button>
        </div>
        {activeTab === "orders" ? (
          orders.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border">
              <p className="text-gray-500">
                No bookings found.
              </p>
            </div>
          ) : (  <div className="grid md:grid-cols-2 gap-6">
            {orders.map((order) => (
             <div key={order.id} className="bg-white rounded-2xl border shadow-sm p-6" >
              <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {order.restaurant}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.meal} </p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {order.status}
                    </span>
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400">
                        Booking Date
                      </p>
                      <p className="text-sm font-medium text-gray-700">
                        {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        Total </p>
                      <p className="text-lg font-bold text-orange-600">
                        ${order.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) ) : (<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-lg transition" >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">

                    <h2 className="text-lg font-bold text-gray-900">
                      {restaurant.name}
                    </h2>

                    <span className="text-sm font-semibold text-orange-600">
                      ⭐ {restaurant.rating}
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 mb-5">
                    {restaurant.category}
                  </p>

                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-xl text-sm font-semibold transition">
                    View Restaurant
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  )
}
export default Dashboard;