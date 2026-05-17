import { useState } from "react"

const categories = [
  "All",
  "Italian",
  "African",
  "Fast Food",
  "Seafood",
  "BBQ",
  "Chinese",
  "Mexican",
  "Japanese",
  "Indian",
  "Cafe",
  "Desserts"
]

function SearchBar({ restaurants, setFilteredRestaurants }) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const handleSearch = (value, category) => {
    let filtered = restaurants
    if (value.trim() !== "") {
      filtered = filtered.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(value.toLowerCase())
      )}
    if (category !== "All") {
      filtered = filtered.filter(
        (restaurant) => restaurant.cuisine === category  
      )}
    setFilteredRestaurants(filtered)}
  const handleInputChange = (e) => {
    const value = e.target.value
    setSearch(value)
    handleSearch(value, activeCategory)
  }

  const handleCategoryClick = (category) => {
    setActiveCategory(category)
    handleSearch(search, category)
  }
  return (
    <div className="w-full mb-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300
              ${activeCategory === category
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-black hover:bg-orange-200"
              }`}>
            {category}
          </button>
        ))}
      </div>
    </div>
  )}

export default SearchBar