import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';










function Login({setUser}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:8000/api/users/token/",{username, password});
            const tokens = res.data;
            if(tokens){
               localStorage.setItem("token", tokens.access);
               localStorage.setItem("refresh", tokens.refresh);

               setUser({username});
            }
            else{
                setMessage("Login failed! No token received");
            }
        
        }catch(error){
            console.error(error)
            setMessage('Login failed!')
        }
    }

    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{display :"flex", flexDirection:"column", justifyContent:"center", marginTop:"30px "}}>
          <h1 className="auth-title">Log in</h1>
          <form onSubmit={handleSubmit} style={{display: "flex", flexDirection:"column", gap:"0.5em"}}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="custom-input"
              autoComplet="off"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="custom-input"
            />
            <button type="submit" className="custom-button">Log In</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
  );

}


export default Login;