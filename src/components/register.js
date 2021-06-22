import React, {useState} from 'react'
import  { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register(){
  
  const [user, setUser] = useState({
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
  
  //html section of this component.
  return (
    <section className="register-page">
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
          <Link to="/"> Sign in here </Link>  
        </span>
        <h4> {err} </h4>
      </form>
    </div>

    </section>
  )
}