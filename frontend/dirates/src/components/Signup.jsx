import React from "react";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords dont match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8000/api/users/sign-up", {
        username,
        email,
        password,
      });
      setMessage("Signup sucessfull!");
    } catch (error) {
      console.error(error);
      setMessage("Singup failed!");
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "30px ",
        }}
      >
        <h1 className="auth-title">Sign up</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            jwwwwustifyContent: "center",
            gap: "0.5em",
          }}
        >
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="custom-input"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="custom-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="custom-input"
          />
          <input
            type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            placeholder="Confirm password"
            className="custom-input"
          />
          <button type="submit" className="custom-button">
            Sign Up
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
