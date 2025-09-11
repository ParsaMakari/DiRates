import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SubmitRating from "./SubmitRating.jsx";

export default function RateTheCourse({ courses, user }) {
  const navigate = useNavigate();
  const { code } = useParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const course = courses?.find((c) => c.code === code);

  useEffect(() => {
    document.title = "Dirates| Rate Course";
  });

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("You must choose a rating!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/courses/ratings/post",
        {
          course: code,
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
      navigate("/")
    } catch (error) {
        if(error.response){
            alert(error.response.data.error + "|| Error submitting the form")
            console.error(error.response.data);
        }
        else{
            alert("Network error")
        }
    }
  };

  if (!user) {
    navigate("/login");
  }

  if (!course) {
    return <h2>Loading course...</h2>;
  }

  return(
    <SubmitRating
      key={code}
      title={course.name}
      Submit={handleSubmit}
      rating={rating}
      setRating={setRating}
      comment={comment}
      setComment={setComment}
    >
    </SubmitRating>
  )
}
