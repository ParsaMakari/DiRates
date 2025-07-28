import React from 'react';
import { useState } from 'react';
import axios from 'axios';




function Signup(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('')
    const [message, setMessage] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(password !== confirmpassword){
            setMessage('Passwords dont match');
            return;
        }
        try{
            const res = await axios.post("http://localhost:8000/api/users/sign-up",{username, email, password});
            setMessage('Signup sucessfull!'); 
        }catch(error){
            console.error(error); 
            setMessage('Singup failed!')
        }
    };
    return(
        <div>
            <form onSubmit={handleSubmit} style={{display: 'flex',flexDirection: 'column', justifyContent:'center', flexGrow:0}}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <input
                    type="password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    placeholder="Confirm password"
                />
                <button type="submit">Sign Up</button>
        </form>
            {message && <p>{message}</p>}
        
        </div>
    );



}



export default Signup;