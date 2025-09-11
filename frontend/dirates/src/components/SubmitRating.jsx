import {useState} from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Rating} from 'react-simple-star-rating'

export default function SubmitRating({ title, Submit, rating, setRating, comment, setComment }) {
    

  return (
    <Card className="m-3 p-3">
      <Card.Header>Submit Rating</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>

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

        <Button onClick={Submit}>Submit</Button>
      </Card.Body>
    </Card>
  );
}
