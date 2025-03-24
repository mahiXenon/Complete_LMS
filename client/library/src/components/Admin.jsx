import React from 'react'
import './Home.css'
import image from './logo_main.jpeg'
import Header from './Header'
import { useNavigate } from 'react-router-dom'

function Admin() {
 const navigate = useNavigate();
 const handleData = (e) =>{
    if(e.target.name == "insert"){
        navigate('/insert')
        navigate(0)
    }
    if(e.target.name == "handle"){
        navigate('/handle')
        navigate(0)
    }
    if(e.target.name == "update"){
        navigate('/update')
        navigate(0)
    }
    if(e.target.name == "bookdetail"){
        navigate('/bookdetail')
        navigate(0)
    }
    if(e.target.name == "issue"){
        navigate('/issue')
        navigate(0)
    }
 }
 const adminHome = () =>{
    navigate('/admin')
 }
  return (
    <div className='home'>
            <div className="admin-home" onClick={adminHome}>
             <Header/>
             </div>
        <div className="container">
            <div className="logo-image">
                <img src={image} style = {{width:"200px"}}alt="" />
            </div>
            <button className='box' name = "insert" onClick={handleData}>
                Insert Book
            </button>
            <button className='box' name = "handle" onClick={handleData}>
                Approve/Reject Request
            </button>
            {/* <button className='box' name = "update" onClick={handleData}>
            Update Book
            </button> */}
            <button className='box' name = "bookdetail" onClick={handleData}>
                Book Details
            </button>
            <button className='box' name = "issue" onClick={handleData}>
                Issued Book
            </button>
        </div>
    </div>
  )
}

export default Admin
