 import React from 'react'
 import './Home.css'
 import image from './logo_main.jpeg'

import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { useEffect } from 'react'



function Home() {
    const navigate = useNavigate();
    const handler = (e) =>{
        if(e.target.name === "create"){
            navigate("/create", { state: { reload: true } });
            // navigate("/return", { state: { reload: true } });
            navigate(0)
        }
        if(e.target.name === "register"){
            navigate("/register", { state: { reload: true } });
            navigate(0)
        }
        if(e.target.name === "request"){
            navigate("/request", { state: { reload: true } });
            navigate(0)
        }
        if(e.target.name === "return"){
            navigate("/return", { state: { reload: true } });
            navigate(0)
        }
    }
    const location = useLocation();


  return (
    <div className='home'>
             <Header/>
        <div className="container">
            <div className="logo-image">
                <img src={image} style = {{width:"200px"}}alt="" />
            </div>
            <button className='box' name="create" onClick={handler}>
                Create A library
            </button>
            <button className='box' name = "register" onClick={handler}>
                Register In Library
            </button>
            <button className='box' name = "request" onClick={handler}>
                Request Book
            </button>
            <button className='box' name = "return" onClick={handler}>
                Return Book
            </button>
        </div>
    </div>
  )
}

export default Home
