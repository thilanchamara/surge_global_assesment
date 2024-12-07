import React, { useState,} from 'react'
import {  Link,useNavigate } from 'react-router-dom'
import M from 'materialize-css'
import './Signup.css'

const Signup = () => {
    const navigate=useNavigate();
    const [username,setUserName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const register = () => {
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        M.toast({ html: "inavalid email",classes:"#d32f2f red darken-2" }); 
        return
      }
      
      fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((datas) => {
          console.log(datas); 
          if (datas.error) {
            M.toast({ html: datas.error,classes:"#d32f2f red darken-2" }); 
          } else {
            M.toast({ html: datas.message,classes:'#00e676 green accent-3'});
            navigate('/login'); 
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          M.toast({ html: "Something went wrong, please try again." }); 
        });
    };
    
  return (
    
      <div className='login-container'>
        <div className='card login-card input-field'>
            <h2>Instagram</h2>
            <input type='text' placeholder='Username'value={username} onChange={(e)=>setUserName(e.target.value)}/>
            <input type='text' placeholder='Email'value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='Password'value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className="waves-effect waves-light btn #64b5f6 blue darken-1" onClick={()=>register()}>Signup</button>
            <h6>
                <Link to='/login'>Already have an account?</Link>
            </h6>
        </div>
    </div>
   
  )
}

export default Signup
