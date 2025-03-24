import React, { useEffect } from 'react'
import Header from './Header'
import image from './logo_main.jpeg'
import './RegisterInLibrary.css'
import { ToastContainer,toast } from 'react-toastify'
import SearchBar from './SearchBar'
import axios from 'axios'
import { useState } from 'react'
import { useLocation } from "react-router-dom";

// import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



const token = localStorage.getItem("token")
function RegisterInLibrary() {
    const navigate = useNavigate();
    
    const location = useLocation();
    const [res,setRes] = useState([]);
    // const [register,setRegister] = useState('Register'0)
    const [search,setSearch] = useState('')
    const [check,setCheck] = useState(true)
    const [library,setLibrary] = useState([])
    const [reg,setreg] = useState(false)
  const fetchLibrary = async() => {
    try{
    const data = await axios.get(`http://localhost:8000/registered`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    console.log(data.data.data)
    setRes(data.data.data)
}catch(err)
{
    console.log(err)
}
  }

const handleSearch = (e) =>{
    console.log(e.target.value)
    setSearch(e.target.value);
    console.log(search)
}
const change = async(search) => {
    try{
        const response = await axios.get(`http://localhost:8000/library/searchlib`,{
            params:{
                searchlib:search
            },
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }
            
        )
        console.log(response.data.data)
        setLibrary(response.data.data)
    } catch(err){
        console.log(err)
    }
}

const makeRequest = async(e) => {
    console.log(e.target.id)
    try{
        const data = await axios.post("http://localhost:8000/user/register",{
            name:e.target.id
        },{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
)
console.log(data)
    toast.success(data.data.message)
    navigate(0)
    fetchLibrary()
    setreg(true)
    fetchLibrary()
        
    }
    catch(err){
        console.log(err)
        setreg(false)
    }
}

useEffect(()=>{
    fetchLibrary()
},[])

useEffect(()=>{
   change(search)
    
},[search])

useEffect(()=>{
    fetchLibrary()
},[reg])
useEffect(() => {
    if (location.state?.reload) {
      fetchLibrary(); // Re-fetch data on navigation
    }
  }, [location.state]);

  return (
    <div>
        <Header/>
        <ToastContainer/>
        <div className='main-register'>
            <img src={image} alt="" style = {{width:"200px"}}/>
            <div className="search-library" onChange={handleSearch}>
            <SearchBar content = {"Search Library"}/>
            </div>
            <div className="library-list">
                <table className = "table-design">
                    <thead>
                    <tr>
                    <th>Libarary Name</th>
                    <th>Status</th>
                    <th>Register/Unregister</th>
                    </tr>
                    </thead>
                    <tbody>{
                        res?.map((key,index) => {
                            return <tr>
                            <td>{key.name}</td>
                            <td id = {key.id+"status"}> Registered</td>
                            {/* <td>Unregister</td> */}
                           <td ><button>Already Registered</button></td>
                        </tr>
                        })
                    }{
                        library?.map((key,index) => {
                            return <tr>
                            <td>{key.name}</td>
                            <td id = {key.id+"status"}> UnRegistered</td>
                            {/* <td>Unregister</td> */}
                           <td ><button onClick = {makeRequest} id = {key.name}>Register</button></td>
                        </tr>
                        })
                    }
                    
                    
       
                    </tbody>
                </table>
            </div>
        </div>
      
    </div>
  )
}

export default RegisterInLibrary
