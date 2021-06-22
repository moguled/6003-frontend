import React from 'react'
import NavBar from './LicensesPages/Navbar'
import CreateLicense from './LicensesPages/addLicense'
import Home from './LicensesPages/Home'
import {BrowserRouter as Router, Route} from 'react-router-dom'


export default function Licenses({loggedIn}) {

  return (
    <Router>
    <div>
      <NavBar loggedIn={loggedIn} />
      <section>
        <Route path='/' component={Home} exact />
        <Route path='/apply' component={CreateLicense} exact />
      </section>
    </div>
    </Router>
  )
}