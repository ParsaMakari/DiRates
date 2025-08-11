import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function SearchBar({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSubmit(newValue);
  };

  return (
    <div
      style={{
        margin: "0.75rem 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Form
        style={{
          width: "min(550px, 90%)",
          background: "#fff",
          borderRadius: "50px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          padding: "0.25rem 0.5rem",
        }}
      >
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={value}
            onChange= {handleSubmit}
            style={{
              border: "none",
              borderRadius: "50px 50px 50px 50px",
              padding: "0.75rem 1rem",
              fontSize: "1rem",
              boxShadow: "none",
            }}
          />
        </InputGroup>
      </Form>
    </div>
  );
}