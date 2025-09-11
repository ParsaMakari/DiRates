import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Card from "react-bootstrap/Card";
import { useEffect } from 'react';
import  Comment from './Comment.jsx' 

export default function CourseDetail({
  courses,
  user,
  courseRatings,
  darkMode,
}) {
  const { code } = useParams();
  const course = courses.find((course) => course.code === code);
  const rating = user
    ? courseRatings.find((r) => r.course === code && r.user.id === user.id) || null
    : null;
  
  const reviews = courseRatings.filter((cr)=> cr.course === course.code); 
  console.log(reviews)

  useEffect(()=>{
    document.title =`DiRates | ${course? course.name : "not found"}`
  },[course])

  if (!course)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
          fontFamily: "Times New Roman",
        }}
      >
        <h2>
          <i>404</i> Course Not Found
        </h2>
      </div>
    );
  return (
    <>
      <Card>
        <Card.Header>Course details</Card.Header>
        <Card.Body style={{display:'flex', justifyContent:'space-between', padding:'1rem'}}>
          <div>
              <Card.Title>{course.name}</Card.Title>
              <Card.Text style={{ color: "gray" }}>{course.description}</Card.Text>
          </div>
           <Rating
                    size={30}
                    initialValue={rating ? rating.score : course.rating}
                    allowFraction={true}
                    fillColor={rating ? "salmon" : "#f1a545"}
                  />
        </Card.Body>
      </Card>

      {reviews.length > 0 && reviews.map((r)=>(
        <Comment key ={r.id} stars={r.score} user={r.user.username}>
          {r.review}
        </Comment>

      ))
      }
    </>
  );
}
