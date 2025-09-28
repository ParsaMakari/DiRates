import Card from "react-bootstrap/Card";
import { Rating } from "react-simple-star-rating";
import LikeButton from './LikeButton.jsx'

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
        <div style={{display:"flex", justifyContent:"space-between", padding:"2px"}}>
          <p style={{padding:"1px", fontFamily:"Garamond"}}>{children}</p>
          <Rating
          style={{margin:"0.25rem"}}
          size={20}
          readonly={true}
          initialValue={stars}
          ></Rating>
        </div>
        <footer className="blockquote-footer">{user}</footer>

        <LikeButton>
          
        </LikeButton>
        
     
      </blockquote>

    </Card.Body>
  );
}
