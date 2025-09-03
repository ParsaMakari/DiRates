import Card from "react-bootstrap/Card";
import { Rating } from "react-simple-star-rating";

export default function Comment({ children, user, stars }) {
  return (
    <Card.Body
      style={{
        margin: "0.5rem",
        padding: "2px",
        border: "1px solid #ddd",
        borderRadius: "12px",
      }}
    >
      <blockquote>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <p>{children}</p>
          <Rating
          style={{margin:"0.25rem"}}
          size={20}
          readonly={true}
          initialValue={stars}
          ></Rating>
        </div>
        <footer className="blockquote-footer">{user}</footer>
      </blockquote>
    </Card.Body>
  );
}
