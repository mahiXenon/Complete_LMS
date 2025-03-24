import React from 'react'
import image from './123.jpg'

import './Signup.css'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer ,toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// import Login from './Login';




function Signup() {
    const navigate = useNavigate()
    const [val,setVal] = useState({
        email:"",
        password:""
    })
    const handler = (e) => {
        setVal((prev) => {
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const url = "http://localhost:8000/auth/login"
        await axios.post(url,{
            "email":val.email,
            "password":val.password
        }).then((response)=>{
            console.log(response.data.token)
            localStorage.setItem('token', response.data.token);
            if(response.status === 200){
               
                    axios.post("http://localhost:8000/checkuser",{
                        email:val.email
                    }).then((response)=>{

                        console.log(response,"res")
                        if(response.status == 200){
                        setTimeout(()=>{
                            navigate('/admin')
                        },1000)
                    }
                    }) .catch((err)=>{
                        console.log(err)
                        setTimeout(()=>{
                            navigate('/home')
                        },1000)
                        // toast.error("Invalid Credentials")
                    });
               
                console.log("User Logged In")
                // navigate('/login')
                toast.success("User Logged In")
               
            }
           
        })
        .catch((err)=>{
            console.log(err)
            toast.error(err.response.data.message)
        });
        
    }
    return (
        <div className="main">
            <ToastContainer/>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="formContain">
                        <h3>Login</h3>
                        <p>Please enter your details</p>
                        <div className="field">
                            <input type="email" name="email" placeholder='Email' onChange={handler} value = {val.email} ></input>
                        </div>
                        <div className="field">
                            <input type="password" name="password" placeholder='Password' onChange={handler} value = {val.password}></input>
                        </div>
                        <div className="btn">
                            <button>Submit</button>
                        </div>
                        <div className="signup">
                            <span>Don&apos;t have any account yet? </span><a href="/signup">Sign Up</a>
                        </div>

                    </div>
                </form>
            </div>
            <div className="sideImage">
                <img src={image} style={{ height: "100%", width: "100%" }} alt="" />
            </div>
        </div>

    )
}

export default Signup
