import { Rating } from "react-simple-star-rating";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, Outlet } from "react-router-dom";
import { useEffect } from 'react';
function Courses({ courses, user, courseRatings }) {

  useEffect(()=>{
    document.title ="DiRates | Courses"
  },[])


  return (
    <div>
      <Card>
        <Card.Header>
          {" "}
          <b>Courses</b>
        </Card.Header>
        <ListGroup variant="flush">
          {courses.map((course) => {
            const rating = user
              ? courseRatings.find(
                  (r) => r.user === user.id && r.course === course.code
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
                    user ? console.log("user") : console.log("not user")
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
