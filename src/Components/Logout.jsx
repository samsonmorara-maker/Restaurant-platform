import { useNavigate } from "react-router-dom"

function Logout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }
  return (
    <button
      onClick={handleLogout}
      className="bg-orange-500 hover:bg-green-300
    text-white
        font-semibold px-4 py-2 rounded-xl shadow-md">
      Logout
    </button>
  )
}

export default Logout;