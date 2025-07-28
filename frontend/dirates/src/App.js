import { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './components/navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Courses from './components/Courses.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Teachers from './components/Teachers.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  

  useEffect(()=> {
    axios.get("http://localhost:8000/api/teachers/")
      .then(res => setTeachers(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(()=>{
    axios.get("http://localhost:8000/api/courses/")
      .then(res => setCourses(res.data))
      .catch(err =>console.error(err))
  },[])


  
  


  return (
  <BrowserRouter>
   
  <div>
    
    <NavBar user={user} />
  </div>
  <Routes>
    <Route path="/login" element = {<Login setUser={setUser} />} />
    <Route path='/signup' element ={<Signup />} />
    <Route path='/teachers' element={<Teachers teachers={teachers} />} />
    <Route path='/courses' element={<Courses courses={courses} />} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
