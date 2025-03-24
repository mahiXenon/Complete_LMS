import React from 'react'
import './bookCard.css'

function BookCardUser({data}) {
  return (
    <div className='book-card'>
        <div className="book-card-field">
            <h2>Library: {data.library_id}</h2>
        </div>
        <div className='book-card-field'>
            <h4>{data.title}</h4>
        </div>
        <div className="book-card-field">
            <p>ISBN: {data.isbn}</p>
        </div>
        <div className='book-card-field'>
            <p>Author:  {data.author }</p>    
        </div>
        <div className='book-card-field'>
            <p>Publisher: {data.publisher}</p>
        </div>
        <div className='book-card-field'>
            <p>Version : {data.version}</p>
        </div>
        <div className='book-card-field'>
            <p>Availability : {data.available_copies}</p>
        </div>
        <div className="book-card-field">
            <p>Total Copies :{data.total_copies}</p>
        </div>
        <div className="book-card-field">
            <button>Request</button>
        </div>
    </div>
  )
}

export default BookCardUser
