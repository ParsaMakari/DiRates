import React from 'react';
import { useState } from 'react';
import axios from 'axios';



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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Log In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );

}


export default Login;