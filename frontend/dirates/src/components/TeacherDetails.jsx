import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Rating } from "react-simple-star-rating";
import Comment from "./Comment.jsx";

export default function TeacherDetails({ teachers, user, ratings, darkMode }) {
  const { id } = useParams();
  const teacher = teachers.find((t) => t.id == id);
  const rating = user
    ? ratings.find((r) => r.user.id === user.id && r.teacher === teacher.id) ||
      null
    : null;
  const teacherReviews =
    ratings.filter((r) => r.teacher === teacher.id) || null;
  console.log(ratings);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = `DiRates | ${teacher ? teacher.last_name : "not found"}`;
  }, [teacher]);

  if (!teacher) {
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
          <i>404</i> Teacher Not Found
        </h2>
      </div>
    );
  }

  return (
    <div>
      <Card key={teacher.id} style={{ height: "50vh", margin: "0.5rem" }}>
        <Card.Header>Teacher information</Card.Header>
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Card.Title>
              {teacher.first_name} {teacher.last_name}
            </Card.Title>
            <Rating
              size={30}
              initialValue={rating ? rating.score : teacher.rating}
              allowFraction={true}
              onClick={() => (user ? console.log("user") : navigate("/login"))}
              fillColor={rating ? "salmon" : "#f1a545"}
              style={{ marginTop: "0.5rem" }}
            ></Rating>
          </div>

          <Card.Img
            src={teacher.picture}
            style={{
              width: "20%", // scale relative to card width
              maxWidth: "300px", // never exceed 300px
              height: "auto", // maintain aspect ratio
              aspectRatio: "1 / 1", // keep it square
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </Card.Body>
      </Card>

      {teacherReviews ? (
        teacherReviews.map((r) => (
          <Comment key={r.id} stars={r.score} user={r.user.username}>
            {r.review}
          </Comment>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
