import React from "react";
import Card from "react-bootstrap/Card";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import { useState, useEffect } from "react";

function Teachers({ teachers, user }) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/teachers/ratings")
      .then((res) => setRatings(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        padding: "10px",
      }}
    >
      {teachers.map((teacher) => {
        const rating =
          user? ratings.find((r) => r.user === user.id && r.teacher === teacher.id) || null: 
          null;

        return (
          <Card
            key={teacher.id}
            style={{
              width: "15vw",
              height: "40vh",
              border: "1px solid black",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {teacher.picture && (
              <Card.Img
                src={teacher.picture}
                variant="top"
                style={{ height: "80%", objectFit: "cover" }}
              />
            )}
            <Card.Body style={{ backgroundColor: "" }}>
              <Card.Title>
                {teacher.first_name} {teacher.last_name}
              </Card.Title>
              {teacher.taught_courses.map((course, index) => (
                <Card.Link key={index}> {course}</Card.Link>
              ))}
              <Card.Text>
                <Rating
                  size={30}
                  initialValue={rating ? rating.score : teacher.rating}
                  allowFraction={true}
                  onClick={() =>
                    user ? console.log("user") : console.log("not user")
                  }
                  fillColor={rating ? "salmon" : "#f1a545"}
                />
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default Teachers;
