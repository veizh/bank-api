
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";

function SignInHtml() {
  return (
    <>
     <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <SignInForm />
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}


const SignInForm = ()=>{
  const navigate = useNavigate()
  const [token,setToken] = useState(null)
  const [username,setUserName]=useState(null)
  const [password,setPassword]=useState(null)
  const [rememberMe,setRememberMe]=useState(false)
  const status = useSelector(state=>state)
  const dispatch = useDispatch()
  async function handleconnection(setToken){
    let tmp ={
      email:username,
        password:password,
        remember:rememberMe
    }
      await fetch("http://localhost:3001/api/v1/user/login",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(tmp)
      
    })
    .then(res=>res.json())
    .then( data=>{
      
      data.status===200 && setToken(data.body.token)
    })
  }

  useEffect(()=>{
    if(token){
      window.localStorage.setItem("token",token)
      dispatch({type:"status/toggle",payload:true})
      navigate('/user')
     
    }
    if(status.status.online){
      navigate("/user")
    }
  },[token])
  return(
    <form>
    <div className="input-wrapper">
      <label htmlFor="username">Username</label>
      <input type="text" id="username" autoComplete="username" onChange={(e)=>setUserName(e.target.value)} />
    </div>
    <div className="input-wrapper">
      <label htmlFor="password">Password</label>
      <input type="password" id="password" autoComplete="current-password" onChange={(e)=>setPassword(e.target.value)} />
    </div>
    <div className="input-remember">
      <input type="checkbox" id="remember-me" onChange={()=>{setRememberMe(!rememberMe)}} />
      <label htmlFor="remember-me">Remember me</label>
    </div>
    <button className="sign-in-button" onClick={async(e)=>{
      e.preventDefault()
      console.log(username,password,rememberMe);
       handleconnection(setToken)
    }}>Sign In</button>
  </form>
  )
}
export default SignInHtml;
