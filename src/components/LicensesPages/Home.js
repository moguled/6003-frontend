import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Home() {
  const [licenses, setlicenses] = useState([])
  const [currenttoken, setToken] = useState('')
  
  const getLicenses = async (currenttoken) =>{
        const res = await axios.get('/api/licenses', {
            headers:{Authorisation: currenttoken}
        })
        setlicenses(res.data)
    }
  
  //grabs the users jwttoken and sets the function to get licenses to take that token as the argument.
  useEffect(() => { 
    const currenttoken = localStorage.getItem('jwt')
    setToken(currenttoken)
    if(currenttoken){
      getLicenses(currenttoken)
        }
    }, [])

  return (
    <div  className="license-container">
      <h1 className="license-header"> All Current Applications </h1>
      {
          licenses.map(license => (
            <div className="object">
                <h3> {license.companyname} </h3>
                <div className="details"> <p> Details: {license.details} </p></div>
                <div className="bottomrow"> 
                  <p className="statustext"> Status: {license.status} </p> 
                  <p className="username"> Name : {license.name} </p> 
                </div>
              </div>
           ))
      }
      
   
    </div>
  )
}