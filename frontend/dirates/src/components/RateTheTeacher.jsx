import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

export default function RateTheTeacher({ teachers, user }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  useEffect(() => {
    document.title = "DiRates | Rate Teacher";
  }, []);

  if (!user) {
    navigate("/login");
  }

  const teacher = teachers?.find((t) => t.id == id);

  if (!teacher) {
    return <p>Loading teacher...</p>;
  }

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("You must choose a rating");
      return;
    }

    try {
      const token = localStorage.getItem("token"); 

      const response = await axios.post(
        "http://localhost:8000/api/teachers/ratings/add",
        {
          teacher: parseInt(id),
          score: rating,
          review: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      alert("Rating submitted!");
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "Error submitting rating");
        console.error(error.response.data);
      } else {
        alert("Network error");
        console.error(error);
      }
    }
  };

  return (
    <Card className="m-3 p-3">
      <Card.Header>Submit Rating</Card.Header>
      <Card.Body>
        <Card.Title>
          {teacher.first_name} {teacher.last_name}
        </Card.Title>

        <div className="mb-3">
          <Rating
            onClick={setRating}
            ratingValue={rating}
            size={30}
            label
            transition
            fillColor="orange"
            emptyColor="gray"
          />
        </div>

        <Form.Group className="mb-3" controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here..."
          />
        </Form.Group>

        <Button onClick={handleSubmit}>Submit</Button>
      </Card.Body>
    </Card>
  );
}
