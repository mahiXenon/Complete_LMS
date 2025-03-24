import React from 'react'
import './Login.css'
import image from './123.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState ,useEffect } from 'react';
import { ToastContainer ,toast} from 'react-toastify';



function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
  return emailPattern.test(email);
}

function isValidName(name){
  for(let i =0;i<name.length;i++)
    if(name[i]>='0' && name[i]<='9')
      return false;
  return true;
}

function isValidPhone(phone){
  if(phone.length != 10)
    return false
  return true;

}

function isValidPassword(password){
    if(password.length<8)
        return false
    let f = 0
    for(let i =0;i<password.length;i++){
      if(/\W/.test(password[i]))
          f = 1;
    }
    return f;
}

function Login() {
  
  // const [name,setName] = useState("")
  // const [email,setEmail] = useState("")
  // const [phone,setPhone] = useState("")
  // const [password,setPassword] = useState("")
  const navigate = useNavigate();
  const [value,setValue] = useState({
    name:"",
    email:"",
    phone:"",
    password:""
  })
  const [isEmail ,setValidEmail] = useState(true)
  const [isName,setValidName] = useState(true)
  const [isPhone,setValidPhone] = useState(true)
  const [isPassword,setValidPassword] = useState(true)
  const [error,setError] = useState(2);
  const [isValidationComplete, setValidationComplete] = useState(false);
  
  
  let change = 1
  const validate = (value) => {
    setValidEmail(isValidEmail(value.email));
    setValidName(isValidName(value.name));
    setValidPhone(isValidPhone(value.phone));
    setValidPassword(isValidPassword(value.password));
    setValidationComplete(true);
  };

  const handler = (e) =>{
    setValue((prev)=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
  const submitdata = (value) =>{
    const url = "http://localhost:8000/auth/signup"
    axios.post(url,{
      "name":value.name,
      "email":value.email,
      "contact_number":value.phone,
      "password":value.password
    }).then((response)=>{
      console.log(response)
      if(response.status === 200){
        console.log("User Created")
        toast.success("User Registered Successfully")
        setTimeout(()=>{
          navigate('/')
        },2500)
      }
  })
    .catch((err)=>{
      console.log(err.response.data.message)
      toast.error(err.response.data.message);
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationComplete(false);
    validate(value);
  };
  useEffect(() => {
    if (isValidationComplete) {
      if (isEmail && isName && isPhone && isPassword) {
        console.log("Form Submitted");
        submitdata(value);
        
      } else {
        setError(1);
      }
    }
  }, [isValidationComplete, isEmail, isName, isPhone, isPassword]);
  return (
    <div className="main">
      <ToastContainer/>
      <div className="form">
        <form onSubmit = {handleSubmit}>
          <div className="formContain">
            <h3>Sign Up</h3>
            <p>Please enter your details</p>
            <div className="field">
              
              <input type = "text" name = "name" placeholder='Name' onChange={handler} value = {value.name}></input>
              {
                isName ? null :<p className='checkValid'>Invalid Name</p>
              }
            </div>
            <div className="field">
              <input type = "text" name = "email" placeholder='Email' onChange={handler} value = {value.email}></input>
              
                {
                  isEmail ? null: <p className='checkValid'>Invalid Email</p>
                }
              
            </div>
            <div className="field">
              <input type = "text" name = "phone" placeholder='Contact Number'  onChange= {handler} value = {value.phone}></input>
              {
                  isPhone ? null: <p className='checkValid'>Invalid Contact Number</p>
                }
            </div>
            <div className="field">
              <input type = "password" name = "password" placeholder='Password' onChange={handler} value = {value.password}></input>
              {
                  isPassword ? null: <p className='checkValid'>Password length should be greater than 8 and must contain special character</p>
                }
            </div>
            <div className="btn">
              <button type = "submit">Submit</button>
            </div>
            
          </div>
        </form>
      </div>
      <div className="sideImage">
        <img src={image} style={{height:"100%",width:"100%"}} alt="" />
      </div>
    </div>
  );
}

export default Login