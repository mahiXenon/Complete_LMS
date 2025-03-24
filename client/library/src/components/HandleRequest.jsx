// import React, { useEffect, useState } from 'react'
// import Header from './Header'
// import image from './logo3.png'
// import './handle.css'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { ToastContainer ,toast} from 'react-toastify'

// const token = localStorage.getItem('token')
// function HandleRequest() {
//     const navigate  = useNavigate();
//     const [res,setRes] = useState([])
//     const [check,setCheck] = useState(false);
//     const handler = async() => {
//         try{
//             const data = await axios.get("http://localhost:8000/admin/see-request",{
//                 headers:{
//                     'Authorization': `Bearer ${token}`
//                 }
//             })
//             console.log(data.data.data);
//             setRes(data.data.data)
//         }
//         catch(err){
//             console.log(err.response.data.message);
//             toast.error(err.response.data.message)
//         }

//     }

//     const adminHandle = async(e) => {
//         console.log(e.target.id)
//         try{
//             const data = await axios.post('http://localhost:8000/admin/handle-request',{
//                 "id":Number(e.target.id)
//             },{
//                 headers:{
//                     'Authorization':`Bearer ${token}`
//                 }
//             })
//             // if()
//             setCheck(true)
//             toast.success(data.data.message)
//             // navigate('/handle');


//         }
//         catch(error){
//             setCheck(false);
//             // console.log(error.response.data.message)
//             // toast.error(error.response.data.message)
//             // console.log(error)
//         }
//     }
//     const handleRequestUser = (e) =>{
//         // e.prevenDefault();
//         setCheck(true);
//         console.log(e.target.name)
//         adminHandle(e);
//         setCheck(false);

//     }
//     useEffect(()=>{
//         handler();
//     },[])
//     useEffect(()=>{
//         handler();
//     },[check])
//   return (
//     <div className='main-handle'>
//         <Header/>
//         <ToastContainer/>
//         <div className="content-handle">
//             <img src={image} alt="" style = {{width:"200px"}}/>
//             <div className="request-button">
//                 {/* <button onClick = {handler}>See New Request</button>
//                 <button onClick = {handleApprove}>See Approved Request</button> */}

//             </div>
//             <div className="table-content-see">
//                 <div className="table-data">
//             <table>
//                 <thead>
//                     {/* <th>ID</th> */}
//                     <th>ISBN</th>
//                     <th>User_id</th>
//                     {/* <th>Library_id</th> */}
//                     <th>Request_date</th>
//                     {/* <th>Approve_date</th> */}
//                     {/* <th>Approver_id</th> */}
//                     <th>Request_type</th>
//                     <th>Action</th>
//                 </thead>
//                 <tbody>
//                     {/* <tr>

//                         <td>1234567890</td>
//                         <td>4</td>
//                         <td>12-03-2025</td>
//                         <td>Borrow</td>
//                         <td><button style={{wordWrap:"none"}}>Accept</button></td>
//                     </tr> */}

//                         {
//                             res?.map((key,index) => {
//                                 return <tr>
//                                 <td>{key.isbn}</td>
//                                 <td>{key.user_id}</td>
//                                 <td>{key.request_date}</td>
//                                 <td>{key.request_type}</td>
//                                 {/* <td id = {key.id+"status"}> Unregistered</td> */}
//                                 {/* <td>Unregister</td> */}
//                                <td ><button onClick={handleRequestUser} name = {key.id} id = {key.id}>{key.request_action}t</button></td>
//                             </tr>
//                             })
//                         }

//                 </tbody>
//             </table>
//             </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default HandleRequest


import React, { useEffect, useState } from "react";
import Header from "./Header";
import image from "./logo_main.jpeg";
import "./handle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const token = localStorage.getItem("token");

function HandleRequest() {
    const navigate = useNavigate();
    const [res, setRes] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch Requests
    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8000/admin/see-request", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.data);
            setRes(response.data.data);
        } catch (err) {
            console.error(err?.response?.data?.message || "Error fetching requests");
            toast.error(err?.response?.data?.message || "Error fetching requests");
        }
        setLoading(false);
    };

    // Handle Admin Response
    const handleAdminResponse = async (e) => {
        const requestId = e.target.id;

        try {
            const response = await axios.post(
                "http://localhost:8000/admin/handle-request",
                { id: Number(requestId) },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(response.data.message);

            // Refresh the request list after handling one
            fetchRequests();
        } catch (error) {
            console.error(error?.response?.data?.message || "Error handling request");
            toast.error(error?.response?.data?.message || "Error handling request");
        }
    };

    // Fetch requests on load
    useEffect(() => {
        fetchRequests();
    }, []);
    const adminHome = () =>{
        navigate("/admin")
    }

    return (
        <div className="main-handle">
            <div className="admin-home" onClick={adminHome}>
             <Header/>
             </div>
            <ToastContainer />
            <div className="content-handle">
                <img src={image} alt="" style={{ width: "200px" }} />
                <div className="table-content-see">
                    <div className="table-data">
                        {loading ? (
                            <p>Loading requests...</p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>ISBN</th>
                                        <th>User_id</th>
                                        <th>Request_date</th>
                                        <th>Request_type</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {res.length > 0 ? (
                                        res.map((request) => (
                                            <tr key={request.id}>
                                                <td>{request.isbn}</td>
                                                <td>{request.user_id}</td>
                                                <td>{request.request_date}</td>
                                                <td>{request.request_type}</td>
                                                <td>
                                                    <button
                                                        onClick={handleAdminResponse}
                                                        id={request.id}
                                                        disabled={request.request_action.toLowerCase() === "book granted" && request.request_type.toLowerCase() == 'borrow'}
                                                    >
                                                        {request.request_action}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">No requests found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HandleRequest;
