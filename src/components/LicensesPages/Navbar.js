import React from 'react'
import  { Link } from 'react-router-dom'

export default function NavBar({loggedIn}) {
  
  const signoutClick = () =>{
    localStorage.clear()
    loggedIn(false)
  }
  
  
  return (
    <div className="navigation" loggedIn={loggedIn}>
       <h1 className="logo"> Trading Licenses Co </h1>
       <a onClick={signoutClick} ><Link to="/"> Sign Out  </Link> </a>
       <a><Link to="/apply"> New Application  </Link> </a>
       <a><Link to="/"> Home  </Link> </a>
       
       
       
    </div>
  )
}