
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookCard from './components/BookCard';
import Home from './components/Home';
import Admin from './components/Admin';
import CreateLibrary from './components/CreateLibrary';
import BookDetail from './components/BookDetail';
import InsertBook from './components/InsertBook';
import RegisterInLibrary from './components/RegisterInLibrary';
import HandleRequest from './components/HandleRequest';
import IssueBook from './components/IssueBook'
import RequestBook from './components/RequestBook';
import ReturnBook from './components/ReturnBook';
import ProfilePage from './components/Profile';


function App() {
  return (
    <>

    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path = "/signup" element = {<Login/>} />
          <Route path = "/home" element = {<Home/>} />
          <Route path = "/admin" element = {<Admin/>} />
          <Route path = "/create" element = {<CreateLibrary/>} />
          <Route path = "/bookdetail" element = {<BookDetail/>} />
          <Route path = "/insert" element = {<InsertBook/>} />
          <Route path = "/register" element = {<RegisterInLibrary/>}/>
          <Route path =  "/handle" element = {<HandleRequest/>} />
          <Route path = '/issue' element = {<IssueBook/>} />
          <Route path = '/request' element = {<RequestBook/>} />
          <Route path = '/return' element = {<ReturnBook/>} />
          <Route path = '/profile' element = {<ProfilePage/>} />
        </Routes>
      </div>
    </Router>
    </>


  );
}

export default App;
