import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

const Header = () => {
    const navigate = useNavigate()

    const {user, logoutUser} = useAuth()


  return (
    <div className='flex justify-between m-6'>
        <div>
            <Link  id="header-logo" to="/" className="pl-20 text-3xl ">BeUs</Link>
        </div>

        <div className=' flex gap-11 mr-5 text-xl '>
            {user ? (
                <>
                    <Link to="/" className="p-1 hover:text-white hover:bg-black rounded-lg">Home</Link>
                    <Link to="/profile" className="p-1 hover:text-white hover:bg-black rounded-lg">Profile</Link>

                    <button onClick={logoutUser} className="p-1 hover:text-white hover:bg-black rounded-lg">Logout</button>
                </>
            ):(
                <Link className="" to="/login">Login</Link>
            )}
        </div>
    </div>
  )
}

export default Header
