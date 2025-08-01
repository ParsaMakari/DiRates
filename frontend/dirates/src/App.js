import { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Navigation from './components/Nav.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Courses from './components/Courses.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Teachers from './components/Teachers.jsx'
import Home from './components/Home.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


function App() {
// states
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(()=> {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

// fcts
  const toggleDarkMode = ()=>{
    setDarkMode((value) => (!value))
  };

  const signOut = ()=>{
    localStorage.removeItem("token")
    setUser(null);
  };

// effect
  useEffect(() => {
    if(darkMode){
      document.body.classList.add("dark-mode")
    }
    else{
      document.body.classList.remove("dark-mode")
    }
    localStorage.setItem("darkMode", darkMode)
  }, [darkMode]);


  useEffect(()=>{
    const token= localStorage.getItem("token");
    if(token){
      setUser({username:"User"});
    }
  },[]);
  

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
    
    <Navigation user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} signOut={signOut} />
  </div>
  <Routes>
    <Route path="/" element={<Home />} />
    {!user ?(
    <>
    <Route path="/login" element = {<Login setUser={setUser} />} />
    <Route path='/signup' element ={<Signup />} />
    </>
    ):(<>
    <Route path="/login" element = {<Navigate to ="/" />} />
    <Route path='/signup' element ={<Navigate to ="/"/>} /> 
    </>)}
    <Route path='/teachers' element={<Teachers teachers={teachers} />} />
    <Route path='/courses' element={<Courses courses={courses} />} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
