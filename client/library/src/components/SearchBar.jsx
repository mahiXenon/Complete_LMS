import React from 'react'
import { FaSearch } from "react-icons/fa";
import './search.css'
function SearchBar({content}) {
    return (
        <div className='search-bar'>
            <div className="center-icon">
            <ul>
                
                <li>
                    <FaSearch className='icons'/>
                    <input type="text" placeholder={content} />
                </li>
            </ul>
            </div>
        </div>
    )
}

export default SearchBar
