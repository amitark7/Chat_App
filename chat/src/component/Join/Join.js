import React, { useState } from 'react'
import logo from '../../images/logo.png.png'
import './join.css'
import {Link} from 'react-router-dom'
let user;
const getUser=()=>{
    user=document.getElementById("joinInput").value;
    document.getElementById('joinInput').value="";
}

const Join = () => {

const[name,setName]=useState("");

  return (
    <div className='joinPage'>
      <div className="JoinContainer">
        <img src={logo} alt="" />
        <h1>A CHAT</h1>
        <input type="text"onChange={(e)=>{setName(e.target.value)}} placeholder='Enter Your Name' id="joinInput" />
        <Link onClick={(event)=>!name?event.preventDefault():null} to="/chat"> <button onClick={getUser} className='joinbtn'>Login</button></Link>
      </div>
    </div>
  )
}

export default Join
export {user}