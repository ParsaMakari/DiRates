import { Rating } from "react-simple-star-rating";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar.jsx'
function Courses({ courses, user, courseRatings }) {

  useEffect(()=>{
    document.title ="DiRates | Courses"
  },[])

  const [shownCourses, setShownCourses]= useState(courses)

  useEffect(()=>{
    if(shownCourses.length === 0){
      setShownCourses(courses)
    }
  },[courses])

  const navigate = useNavigate(); 

  return (
    <div>
      <SearchBar
      onSubmit={(searchTerm)=>{
        setShownCourses(
          courses.filter((course)=>
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.code.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      }}
      />
      <Card style ={{height:"120vh"}}>
        <Card.Header>
          {" "}
          <b>Courses</b>
        </Card.Header>
        <ListGroup variant="flush">
          {shownCourses.map((course) => {
            const rating = user
              ? courseRatings.find(
                  (r) => r.user.id === user.id && r.course === course.code
                ) || null
              : null;
            return (
              <ListGroup.Item
                key={course.code}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Link to={`/courses/${course.code}`}>
                  {course.code} : {course.name}
                </Link>
              
                <Rating
                  size={30}
                  initialValue={rating ? rating.score : course.rating}
                  allowFraction={true}
                  onClick={() =>
                    user ? navigate(`${course.code}/rate`) : navigate(`/login`) 
                  }
                  fillColor={rating ? "salmon" : "#f1a545"}
                />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
      <Outlet />
    </div>
  );
}

export default Courses;
