import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Rating } from "react-simple-star-rating";

export default function TeacherDetails({
  teachers,
  user,
  teacherRatings,
  darkMode,
}) {
  const { id } = useParams();
  const teacher = teachers.find((t) => t.id == id);
  const rating = user
    ? teacherRatings.find(
        (r) => r.user === user.id && r.teacher === teacher.id
      ) || null
    : null;
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
      <Card key={teacher.id} style={{height:"70vh"}}>
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
              width: "20vw", // 20% of viewport width
              height: "20vw", // keep it square
              objectFit: "cover",
              borderRadius: "50%", // optional, makes it round
            }}
          />
        </Card.Body>
      </Card>
      <Card>

      </Card>
    </div>
  );
}
