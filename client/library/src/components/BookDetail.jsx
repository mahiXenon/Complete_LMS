import React, { useEffect , useState} from 'react'
import './BookDetail.css'
import Header from './Header'
import image from './logo_main.jpeg'
import SearchBar from './SearchBar'
import BookCard from './BookCard'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const token = localStorage.getItem('token')

function BookDetail() {
    const navigate = useNavigate();
const [books, setBooks] = useState([])
const [searchVal,SetsearchVal] = useState('')
const fetchBooks = async () => {
    try{
    const response = await axios.get('http://localhost:8000/book/all',{
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
useEffect(() => {
    fetchBooks();
    console.log(searchVal)
  }
  , []);

useEffect(() => {
        fetchBooksOnSearch(searchVal);
        console.log(searchVal)
    }
    , [searchVal]);

useEffect(() =>{
    if(searchVal.length == 0)
        fetchBooks();
},[searchVal])
const adminHome = () =>{
    navigate('/admin')
}
  return (
    <div className='book-detail'>
       <div className="admin-home" onClick={adminHome}>
             <Header/>
             </div>
            <div className="book-container">
            <img src={image} alt="" style = {{width:"200px"}}/>
            <div onChange = {handler}>
            <SearchBar content = {"Search Book"}/>
            {handler}
            </div>
            <div className="card-maintain">
            {
                books.length === 0 ? <p>No Books Available</p> :
                books?.map((key,value) => {
                    return <BookCard data={key} value = {value}/>
                })
            }
            </div>

        </div>
    </div>
  )
}


export default BookDetail
