import React, { useEffect , useState} from 'react'
import './BookDetail.css'
import Header from './Header'
import image from './logo_main.jpeg'
import SearchBar from './SearchBar'
import BookCardUser from './BookCardUser'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const token = localStorage.getItem('token')

function ReturnBook() {
const [books, setBooks] = useState([])
const [searchVal,SetsearchVal] = useState('')
const fetchBooks = async () => {
    try{
    const response = await axios.get('http://localhost:8000/book/return',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    // console.log(response.data.data)
    setBooks(response.data.data)
} catch(err){
    console.log(err)
}
}
const fetchBooksOnSearch = async (searchVal) => {
    try{
    const response = await axios.get(`http://localhost:8000/book/${searchVal}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    // console.log(response.data.data)
    setBooks(response.data.data)
} catch(err){
    console.log(err)
}
}
const handler = (e) => {
    SetsearchVal(e.target.value)
    console.log(searchVal)
}

const makeRequest = async(e)=>{
    console.log(e.target.id)
    console.log(e.target.value)
    try{
        const data = await axios.post("http://localhost:8000/user/make-request",{
            isbn:e.target.id,
            library_id:Number(e.target.value),
            request_type:"return"
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        console.log(data)
        toast.success(data.data.message)
    }
    catch(err){
        console.log(err)
        toast.error(err.response.data.message)
    }
}
useEffect(() => {
    fetchBooks();
    console.log(searchVal)
  }
  , []);

// useEffect(() => {
//         fetchBooksOnSearch(searchVal);
//         console.log(searchVal)
//     }
//     , [searchVal]);

useEffect(() =>{
    if(searchVal.length == 0)
        fetchBooks();
},[searchVal])
  return (
    <div className='book-detail'>
        <Header/>
            <ToastContainer/>
            <div className="book-container">
            <img src={image} alt="" style = {{width:"200px"}}/>
            {/* <div onChange = {handler}> */}
            {/* <SearchBar content = {"Search Book"}/> */}
            {/* {handler} */}
            {/* </div> */}
            <div className="card-maintain">
            {
                books.length === 0 ? <p>No Books Available</p> :
                books?.map((key,value) => {
                    
                    return <div className='book-card' >
                    <div className="book-card-field">
                        <h2>Library: {key.library_id}</h2>
                    </div>
                    <div className='book-card-field'>
                        <h4>{key.title}</h4>
                    </div>
                    <div className="book-card-field">
                        <p>ISBN: {key.isbn}</p>
                    </div>
                    <div className='book-card-field'>
                        <p>Author:  {key.author }</p>    
                    </div>
                    <div className='book-card-field'>
                        <p>Publisher: {key.publisher}</p>
                    </div>
                    <div className='book-card-field'>
                        <p>Version : {key.version}</p>
                    </div>
                    <div className='book-card-field'>
                        <p>Availability : {key.available_copies}</p>
                    </div>
                    <div className="book-card-field">
                        <p>Total Copies :{key.total_copies}</p>
                    </div>
                    <div className="book-card-field">
                        <button onClick = {makeRequest} id = {key.isbn} value = {key.library_id}>Return</button>
                    </div>
                </div>
                })
            }
            </div>

        </div>
    </div>
  )
}


export default ReturnBook

