import React, { useEffect, useState } from 'react'
import Header from './Header'
import image from './logo_main.jpeg'
import './handle.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer ,toast} from 'react-toastify'

const token = localStorage.getItem('token')
function HandleRequest() {

    const navigate  = useNavigate();
    const [res,setRes] = useState([])
    const [check,setCheck] = useState(false);
    const adminHome = () =>{
        navigate('/admin')
     }
    const handler = async() => {
        try{
            const data = await axios.get("http://localhost:8000/admin/issue",{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(data.data.data);
            setRes(data.data.data)
        }
        catch(err){
            console.log(err);
        }

    }

   
 

    useEffect(()=>{
        handler();
    },[])

    const adminHomeCheck = () =>{
        navigate('/admin')
    }
  return (
    <div className='main-handle'>
        <div className="admin-home" onClick={adminHomeCheck}>
             <Header/>
             </div>
        <ToastContainer/>
        <div className="content-handle">
            <img src={image} alt="" style = {{width:"200px"}}/>
            <div className="request-button">
                {/* <button onClick = {handler}>See New Request</button>
                <button onClick = {handleApprove}>See Approved Request</button> */}
                
            </div>
            <div className="table-content-see">
                <div className="table-data">
            <table>
                <thead>
                    {/* <th>ID</th> */}
                    <th>ISBN</th>
                    <th>User_id</th>
                    {/* <th>Library_id</th> */}
                    <th>Status</th>
                    <th>Return_date</th>
                    {/* <th>Approver_id</th> */}
                    {/* <th>Request_type</th> */}
                    {/* <th>Action</th> */}
                </thead>
                <tbody>
                    {/* <tr>
                
                        <td>1234567890</td>
                        <td>4</td>
                        <td>12-03-2025</td>
                        <td>Borrow</td>
                        <td><button style={{wordWrap:"none"}}>Accept</button></td>
                    </tr> */}
                    
                        {
                            res?.map((key,index) => {
                                return <tr>
                                <td>{key.isbn}</td>
                                <td>{key.user_id}</td>
                                <td>{key.issue_status}</td>
                                <td>{key.return_date}</td>
                                {/* <td id = {key.id+"status"}> Unregistered</td> */}
                                {/* <td>Unregister</td> */}
                               {/* <td ><button onClick={handleRequestUser} name = {key.id} id = {key.id}>{key.request_action}t</button></td> */}
                            </tr>
                            })
                        }
                    
                </tbody>
            </table>
            </div>
            </div>
        </div>
    </div>
  )
}

export default HandleRequest