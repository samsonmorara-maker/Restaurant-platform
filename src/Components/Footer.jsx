import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-orange-500">TastyBites</h2>
          <p className="text-gray-400 mt-2">
            Discover the best restaurants and pre-order your meals with ease.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-orange-500">Home</Link></li>
            <li><Link to="/restaurants" className="hover:text-orange-500">Restaurants</Link></li>
            <li><Link to="/Bookings" className="hover:text-orange-500">My Bookings</Link></li>
            <li><Link to="/login" className="hover:text-orange-500">Login</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: support@tastybites.com</li>
            <li>Phone NO :+254 745 711 223</li>
            <li>Location: Nairobi, Kenya</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="https://twitter.com" target="_blank" className="hover:text-orange-500">Twitter</a>
            <a href="https://instagram.com" target="_blank" className="hover:text-orange-500">Instagram</a>
            <a href="https://facebook.com" target="_blank" className="hover:text-orange-500">Facebook</a>
          </div>
        </div>

      </div>
      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} TastyBites. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer