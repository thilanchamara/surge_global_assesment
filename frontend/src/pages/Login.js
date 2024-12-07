import React, { useState,useContext} from 'react'
import {  Link,useNavigate } from 'react-router-dom'
import M from 'materialize-css'
import './Signup.css'
import { userContext } from '../App'

const Login = () => {
  const { state, dispatch } = useContext(userContext);

    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

  const login = () => {
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      M.toast({ html: "inavalid email",classes:"#d32f2f red darken-2" }); 
      return
    }
    
    fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
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
          dispatch({type:"USER",payload:datas.user})
          M.toast({ html: "Logged In",classes:'#00e676 green accent-3'});
          navigate('/'); 
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
        <input type='text' placeholder='Email'value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type='password' placeholder='Password'value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className="waves-effect waves-light btn #64b5f6 blue darken-1" onClick={()=>login()}>Login</button>
        <h6>
            <Link to='/signup'>Don't have an account?</Link>
        </h6>
      </div>
    </div>
  )
}

export default Login
