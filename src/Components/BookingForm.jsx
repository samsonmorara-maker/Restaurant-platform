import { useState } from "react"

function BookingForm({ restaurant, preOrderItems }) {
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [guests, setGuests] = useState(1)

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const newBooking = {
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      name,
      date,
      time,
      guests,
      preOrderItems,
      status: "active"
    }

    try {
      const res = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBooking)
      })

      if (!res.ok) throw new Error("Failed to create booking")

      alert("Booking successful!")

      // reset form
      setName("")
      setDate("")
      setTime("")
      setGuests(1)

    } catch (error) {
      console.error("Booking error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4"
    >
        
      <h2 className="text-xl font-bold">
        Book {restaurant.name}
      </h2>
      {preOrderItems && preOrderItems.length > 0 && (
        <div>
            <h3>
                pre-ordered meal
            </h3>
            {preOrderItems.map((item, index) => (
      <div key={index} className="flex items-center gap-4 border-b pb-2 mb-2">
        <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-lg"/>
        <div>
          <p className="font-bold">{item.name}</p>
          <p className="text-orange-500">${item.price}</p>
        </div>
        </div>
      ))}
</div>
      )}
      <input
        type="text"
        placeholder="Your Name" value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-4 py-2 rounded-lg"required/>

      <input type="date"
        value={date} onChange={(e) => setDate(e.target.value)}
        className=" border px-4 py-2 rounded-lg"required/>
      <input type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border px-4 py-2 rounded-lg"required/>
      <input
        type="number"
        min="1" placeholder="number of guests" value={guests}
        onChange={(e) => setGuests(e.target.value)}
        className="border px-4 py-2 rounded-lg"required/>

      <button
        type="submit"  disabled={loading}
        className=" bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600" >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  )
}
export default BookingForm