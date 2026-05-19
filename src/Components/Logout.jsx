import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

function Logout() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try{ 
      await signOut(auth)
      navigate("/login")
    }catch(error){
      console.log(error)
    }
   
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