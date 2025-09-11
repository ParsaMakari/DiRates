import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Navigation from "./components/Nav.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Courses from "./components/Courses.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Teachers from "./components/Teachers.jsx";
import Home from "./components/Home.jsx";
import TeacherDetails from "./components/TeacherDetails.jsx";
import CourseDetail from "./components/CourseDetail.jsx";
import RateTheTeacher from "./components/RateTheTeacher.jsx"
import RateTheCourse from "./components/RateTheCourse.jsx"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


function App() {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [courseRatings, setCourseRatings] = useState([]);
  const [teacherRatings, setTeacherRatings] = useState([]);




  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.user_id,
      });
    }

    axios
      .get("http://localhost:8000/api/courses/ratings")
      .then((res) => setCourseRatings(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:8000/api/teachers/")
      .then((res) =>
        setTeachers(
          res.data.sort((a, b) => a.last_name.localeCompare(b.last_name))
        )
      )
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:8000/api/courses/")
      .then((res) =>
        setCourses(res.data.sort((a, b) => a.code.localeCompare(b.code)))
      )
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:8000/api/teachers/ratings")
      .then((res) => setTeacherRatings(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (

    <>
      <div>
        <Navigation
          user={user}
          signOut={signOut}
        />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        {!user ? (
          <>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
          </>
        )}
        <Route
          path="/teachers"
          element={
            <Teachers
              teachers={teachers}
              user={user}
              ratings={teacherRatings}
            />
          }
        />
        <Route
          path="/courses"
          element={
            <Courses
              courses={courses}
              user={user}
              courseRatings={courseRatings}
            />
          }
        />
        <Route
          path="/courses/:code/rate"
          element={
            <RateTheCourse
              courses={courses}
              user={user}
            />
          }
        />
        
        <Route
          path="/courses/:code"
          element={
            <CourseDetail
              courses={courses}
              user={user}
              courseRatings={courseRatings}
            />
          }
        />

        <Route
          path="/teachers/:id"
          element={
            <TeacherDetails
              teachers={teachers}
              user={user}
              ratings={teacherRatings}
            />
          }
        />
        <Route
          path="/teachers/:id/rate"
          element={
            <RateTheTeacher
              teachers={teachers}
              user={user}
            />
          }
        />
      </Routes>
    </>

  );
}

export default App;
