import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { IoCart, IoHeart } from "react-icons/io5"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"


const Header = () => {
  const userSelector = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogOut = () => {
    // 1. Remove local storage
    // 2. Reset user slice
    localStorage.removeItem("current-user")
    dispatch({
      type: "USER_LOGOUT"
    })

  }
  return (
    <header className='h-16 border border-b flex justify-between items-center px-8'>
      {/* BRAND*/}
      <Link to="/" className="text-2xl font-bold hover:cursor-pointer">Zidan Creation</Link>

      {/*Search Bar */}
      <Input className="max-w-[600px]" placeholder="Search Product" />

      {/* Buttons*/}
      <div className="flex space-x-4 h-5 items-center">
        <div className="flex space-x-2">
          <Link to="/cart">
            <Button size="icon" variant="ghost"><IoCart className="w-6 h-6" /></Button>
          </Link>

          <Button size="icon" variant="ghost"><IoHeart className="w-6 h-6" /></Button>
        </div>

        <Separator orientation="vertical" className="h-full"></Separator>

        <div className="flex space-x-2 items-center">
          {
            userSelector.id ?
              <>
                <p>Hello {userSelector.username} ({userSelector.role})</p>
                <Button onClick={handleLogOut} variant='destructive'>Log Out</Button>
              </>
              :
              <>
                <Link to='/login'><Button>Log in</Button></Link>
                <Link to='/register'><Button variant="outline">Sign Up</Button></Link>
              </>
          }
        </div>

      </div>
    </header>
  )
}

export default Header