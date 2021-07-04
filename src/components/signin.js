import React, {useState} from 'react'
import axios from 'axios'

//functions that control this page.
export default function SignIn({loggedIn}){
  const [user, setUser] = useState({//Sets the user thats going to login
    email: '',
    password: '',
    name: ''
  })
  const[err,setErr] = useState('')
  
  
  
  
  
  const OnChangeInput = e => {
    const {name, value} = e.target;
    setUser({...user, [name]:value})
    setErr('')
  }
   
  //Sign in methods. posts the inputted data to the back
  const SignInSubmit = async e =>{
    e.preventDefault()
    try{
      const res = await axios.post('/api/users/login',{
        email: user.email,
        password: user.password
      })
      console.log(res.data.email)           
      setUser({email: '', password: '', name: ''})
      localStorage.setItem('jwt', res.data.jwttoken);

      if (res.data.role == "admin"){
        
         localStorage.setItem('r', "01234");
        
      }
      
      
      loggedIn(true)
    }catch(err){
      err.response.data.errmsg && setErr(err.response.data.errmsg)
      //console.log(err);
    }
  }
  
  //Register function upon clicking the register button.
  const RegisterSubmit = async e =>{
    e.preventDefault()
    try{
      const res = await axios.post('/api/users/register',{
        email: user.email,
        password: user.password,
        name: user.name
      })
      setUser({email: '', password: '', name: ''})
      //Success message is returned upon 
      setErr(res.data.errmsg)
    }catch (err){
      err.response.data.errmsg && setErr(err.response.data.errmsg)
    }
  }
  
  return (
    <section className="signin-page">
      <h1> Welcome to my Trading Licenses Application Website </h1>
      <div className = "signin-container">
        <h1> Sign In </h1>
        <form onSubmit = {SignInSubmit}>
          <h2>Email Address </h2>
          <input type="email" name="email" id="signin-email" className = "signin-input"  placeholder="Enter email here" required value={user.email} onChange={OnChangeInput}></input>
          <h2> Password </h2>
            <input type="password" name="password" className = "signin-input" id="signin-password" placeholder="Enter password here" required value={user.password} onChange={OnChangeInput}></input>
          <div><button className="signin-button" type='submit'> Sign In  </button> </div>
          <span> 
            Register here
          </span>
          <h4> {err} </h4>
        </form>
      </div>
      <div className = "register-container">
      <h1> Register </h1>
        <form onSubmit = {RegisterSubmit}>
          <h2>Email Address </h2>
          <input type="email" name="email" id="register-email" className="register-input" placeholder="Enter email here" required value={user.email} onChange={OnChangeInput}></input>
          <h2>Password </h2>
          <input type="password" name="password" id="register-password" className="register-input" placeholder="Enter password here" required value={user.password} onChange={OnChangeInput}></input>
          <h2> Name </h2>
          <input type="text" name="name" id="register-name" className="register-input" placeholder="Enter name here" required value={user.name} onChange={OnChangeInput}></input>
          <div> <button className = "register-button" type='submit'> Register </button> </div>
        <span> 
           Sign in here  
        </span>
        <h4> {err} </h4>
      </form>
    </div>
    
    </section>
  )
}