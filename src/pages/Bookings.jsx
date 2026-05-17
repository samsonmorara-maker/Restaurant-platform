import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import BookingForm from "../Components/BookingForm"
function Bookings() {
  const [bookings, setBookings] = useState([])
  const [editingBooking, setEditingBooking] = useState(null)
  const location = useLocation()
  const { restayrant, preOrderItems} = location.state || {}
  useEffect(() => {
    fetchBookings()
  }, [])
  const fetchBookings = async () => {
    try {
      const res = await fetch("https://restaurant-platform-cr7r.onrender.com")
      if (!res.ok) {
        throw new Error("Failed to fetch bookings")
      }
      const data = await res.json()
      setBookings(data)
    } catch (error) {
      console.error("Error fetching bookings:", error)
    }
  }
  const handleCancelBooking = async (id) => {
    try {
      await fetch(`https://restaurant-platform-cr7r.onrender.com/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "cancelled"
        })
      })
      setBookings(
        bookings.map((booking) =>
          booking.id === id
            ? { ...booking, status: "cancelled" }
            : booking
        )
      )
      alert("Booking cancelled!")
    } catch (error) {
      console.error("Error cancelling booking:", error)
    }
  }
  const handleDeleteBooking = async (id) => {
    try {
      await fetch(`https://restaurant-platform-cr7r.onrender.com/bookings/${id}`, {
        method: "DELETE"
      })
      setBookings(
        bookings.filter((booking) => booking.id !== id)
      )
      alert("Booking deleted!")
    } catch (error) {
      console.error("Error deleting booking:", error)
    }
  }
  const handleEditBooking = (booking) => {
    setEditingBooking(booking)
  }
  const handleSaveEdit = async () => {
    try {
      await fetch(
        `https://restaurant-platform-cr7r.onrender.com/bookings/${editingBooking.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editingBooking)
        })
      setBookings(
        bookings.map((booking) =>
          booking.id === editingBooking.id
            ? editingBooking
            : booking
        ))
      alert("Booking updated!")
      setEditingBooking(null)
    } catch (error) {
      console.error("Error updating booking:", error)
    }
  }
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">
        My Bookings
      </h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow-md p-6">
              {editingBooking?.id === booking.id ? (
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={editingBooking.name}
                    onChange={(e) =>
                      setEditingBooking({
                        ...editingBooking,
                        name: e.target.value
                      })
                    }
                    placeholder="Customer Name"
                    className="border rounded-lg px-4 py-3"/>
                  <input
                    type="date"
                    value={editingBooking.date}
                    onChange={(e) =>
                      setEditingBooking({
                        ...editingBooking,
                        date: e.target.value
                      })
                    }
                    className="border rounded-lg px-4 py-3"/>
                  <input
                    type="time"
                    value={editingBooking.time}
                    onChange={(e) =>
                      setEditingBooking({
                        ...editingBooking,
                        time: e.target.value
                      })
                    }
                    className="border rounded-lg px-4 py-3"/>
                  <input
                    type="number"
                    value={editingBooking.guests}
                    onChange={(e) =>
                      setEditingBooking({
                        ...editingBooking,
                        guests: e.target.value
                      })
                    }
                    placeholder="Guests"
                    className="border rounded-lg px-4 py-3" />
                  <div className="flex gap-4">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingBooking(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">
                    {booking.restaurantName}
                  </h2>
                  <div className="mt-4 space-y-2">
                    <p>
                      <span className="font-bold">Name:</span>{" "}
                      {booking.name}
                    </p>
                    <p>
                      <span className="font-bold">Date:</span>{" "}
                      {booking.date}
                    </p>
                    <p>
                      <span className="font-bold">Time:</span>{" "}
                      {booking.time}
                    </p>
                    <p>
                      <span className="font-bold">Guests:</span>{" "}
                      {booking.guests}
                    </p>
                    <p>
                      <span className="font-bold">Total:</span>{" "}
                      ${booking.total}
                    </p>
                    <p
                      className={`font-bold
                        ${
                          booking.status === "cancelled"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}>
                      Status: {booking.status}
                    </p>
                  </div>
                  {booking.preOrderItems?.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-bold mb-3">
                        Pre-Order Items
                      </h3>
                      <div className="space-y-2">
                        {booking.preOrderItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between border-b pb-2">
                            <p>{item.name}</p>
                            <p>${item.price}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-4 mt-6">
                    {booking.status !== "cancelled" && (
                      <button
                        onClick={() =>
                          handleEditBooking(booking)
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300">
                        Edit Booking</button> )}
                    {booking.status !== "cancelled" && (
                      <button
                        onClick={() =>
                          handleCancelBooking(booking.id)
                        }
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300"
                      >Cancel Booking</button>
                    )}
                    <button
                      onClick={() =>
                        handleDeleteBooking(booking.id)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300" >
                      Delete Booking</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default Bookings