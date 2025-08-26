import Card from "react-bootstrap/Card";
import { Rating } from "react-simple-star-rating";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";


function Teachers({ teachers, user, ratings }) {
  useEffect(() => {
    document.title = "DiRates | Teachers";
  }, []);

  const [shownTeachers, setShownTeachers] = useState(teachers);

  useEffect(() => {
    if (shownTeachers.length === 0) {
      setShownTeachers(teachers);
    }
  }, [teachers]);


  const navigate = useNavigate();

  return (
    <div>
      <SearchBar
        onSubmit={(searchTerm) => {
          setShownTeachers(
            teachers.filter((teacher) =>
              teacher.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              teacher.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (teacher.first_name + " " + teacher.last_name).toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          padding: "10px",
        }}
      >
        {shownTeachers.map((teacher) => {
          const rating = user
            ? ratings.find(
                (r) => r.user === user.id && r.teacher === teacher.id
              ) || null
            : null;

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
                ></Card.Img>
              )}
              <Card.Body style={{ backgroundColor: "" }}>
                <Card.Title>
                  <Link
                    to={`${teacher.id}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#4587f1ff")}
                    onMouseLeave={(e) => (e.target.style.color = "inherit")}
                  >
                    {teacher.first_name} {teacher.last_name}
                  </Link>
                </Card.Title>
                {teacher.taught_courses.map((course, index) => (
                  <Card.Link
                    as={Link}
                    to={`/courses/${course}`}
                    key={index}
                    style={{ color: "gray" }}
                  >
                    {" "}
                    {course}
                  </Card.Link>
                ))}
                <Card.Text>
                  <Rating
                    size={30}
                    initialValue={rating ? rating.score : teacher.rating}
                    allowFraction={true}
                    onClick={() =>
                      user ? navigate(`${teacher.id}/rate`) : navigate("/login")
                    }
                    fillColor={rating ? "salmon" : "#f1a545"}
                    style={{ marginTop: "0.5rem" }}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>{" "}
    </div>
  );
}

export default Teachers;
