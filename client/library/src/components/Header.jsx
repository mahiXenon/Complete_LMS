import React from 'react'
import './Header.css'
import image from './logo_main.jpeg'

import { useNavigate } from 'react-router-dom'
function Header() {
  const navigate = useNavigate();
  const handlehome = (e) =>{
    // if(e.target.name == "home")
    // {
    //   navigate('/home')
    //   // navigate(0);
    // }
    // if(e.target.name == "profile")
    // {
    //   navigate('/profile')
    //   // navigate(0)
    // }
    navigate('/home')
  }
  const handlecheck =() =>{
    navigate('/profile')

  }
  return (
    <div className='header'>
        <div className="navbar">
            <img src={image} alt="" style = {{height:"auto",width:"75px"}}/>
            <ul>
                <li onClick={handlehome} name = "home" >Home</li>
            </ul>
            <div className = "profile"onClick={handlecheck} name = "profile" >
                Profile
            </div>
            {/* <div className="profile">
              Delete Account
            </div> */}
        </div>
    </div>
  )
}

export default Header
