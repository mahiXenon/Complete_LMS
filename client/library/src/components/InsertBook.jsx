import React, { use, useState } from 'react'
// import './InsertBook.css'
import './CreateLibrary'
import axios from 'axios'
import { ToastContainer ,toast} from 'react-toastify'
import Header from './Header'
import image from './logo_main.jpeg'
import { useNavigate } from 'react-router-dom'

const token = localStorage.getItem("token")
function InsertBook() {
    const navigate = useNavigate();
    const [data,setData] = useState({
        isbn:"",
        title:"",
        author:"",
        publisher:"",
        version:"",
        total_copies:""
    });
    const submitBook = async(data) => {
        try{
            // console.log(type(data.total_copies))
            const res = await axios.post('http://localhost:8000/admin/insert-book', {
                isbn:data.isbn,
                title:data.title,
                author:data.author,
                publisher:data.publisher,
                version:data.version,
                total_copies:Number(data.total_copies)
            },{
            headers: {  
                'Authorization': `Bearer ${token}`
            }
            })
            console.log(res)
            toast.success("Book Successfully Inserted")
    }
    catch(err){
        console.log(err)
        toast.error(err.response.data.message)
    }
}
    const validate = (e) =>{
        e.preventDefault();
        if((data.isbn).length != 10){
            toast.error("Enter a valid ISBN")
            return 
        }
        console.log(data.isbn[9])
        for(let i = 0;i<10;i+=1)
        {
            // console.log(data.isbn[9])
            if((data.isbn[i]>='a' && data.isbn[i]<='z') || (data.isbn[i]>='A' && data.isbn[i]<='Z'))
            {
                console.log(data.isbn[i])
                toast.error("Enter a valid ISBN")
                return;
            }
        }
        submitBook(data);
    }

    const handler = (e) =>{
        setData((prev)=>{
          return {...prev,[e.target.name]:e.target.value}
        })
      }
      const adminHome = () =>{
        navigate('/admin')
     }
  return (
    <div className='main-create'>
    <ToastContainer/>
    <div className="admin-home" onClick={adminHome}>
             <Header/>
             </div>
    <img src={image} alt="" style = {{width:"200px"}}/>
<div className='create'>
    <h2>Insert A New Book</h2>
    <div className="library-form">
        <div className="library-input">
            <input type="text" placeholder='Book ISBN' onChange={handler} name = "isbn" value= {data.isbn}/>
        </div>
        <div className="library-input">
            <input type="text" placeholder='Book Title' onChange={handler} name = "title" value = {data.title}/>
        </div>
        <div className="library-input">
            <input type="text" placeholder='Book Author' onChange={handler} name = "author" value = {data.author}/>
        </div>
        <div className="library-input">
            <input type="text" placeholder='Book Publisher' onChange={handler} name = "publisher" value = {data.publisher}/>
        </div>
        <div className="library-input">
            <input type="text" placeholder='Book Version' onChange={handler} name = "version" value = {data.version}/>
        </div>
        <div className="library-input">
            <input type="number" placeholder='Total Copies' onChange={handler} name = "total_copies" value = {data.total_copies}/>
        </div>
        <div className="library-input">
            <button onClick = {validate} >Submit</button>

        </div>
    </div>
</div>

 </div>
  )
}

export default InsertBook
