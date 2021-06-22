import React, {useState} from 'react'
import axios from 'axios'

export default function CreateLicense() {
  const [license, setLicense] = useState({
    companyname: '',
    companytype: '',
    details: ''
  })
  const[err,setErr] = useState('');
  

  //Whenever the input fields are updated.
  const OnChangeInput = e => {
    const {name, value} = e.target;
    setLicense({...license, [name]:value})
    setErr('')
  }
  
  //functions that pushes the users input to the database.
  const addNewLicense = async e => {
    e.preventDefault()
   
    try{
      const currenttoken = localStorage.getItem('jwt') //takes jwttoken from localstorage
      if(currenttoken){
        const {companyname, companytype, details} = license;
        const newLicense = {companyname, companytype, details}
        const res = await axios.post('/api/licenses', newLicense,{
          headers: {Authorisation: currenttoken}
        })
        //Sets the err value when successful so it prints a success message below the form.
        setErr(res.data.errmsg)
      }
      else{   
        alert("Authentication Error")    
      }
    }
    catch(err){
      err.response.data.errmsg && setErr(err.response.data.errmsg)
    }
    
  }
  
  return (
    <div className="addLicenseContainer">
      <h1> Applying for a trading license? </h1>
      <form onSubmit={addNewLicense}>
          <h2> Company Name </h2>
            <input type="text" name="companyname" id="companyname" className = "application-input"  placeholder="Enter company name here..." value={license.companyname} required onChange={OnChangeInput} ></input>
          <h2> Company Type </h2>
            <input type="text" name="companytype" className = "application-input" id="companytype" placeholder="Company Focus?" value={license.companytype} required onChange={OnChangeInput} ></input>
          <h2> Application Details </h2>
            <textarea type="text" name="details" maxLength="200" rows="10"  className = "application-textarea"  id="details" placeholder="Enter further details..." value={license.details} required onChange={OnChangeInput}  ></textarea >
          <div> <button className = "licensebutton" type="submit"> SUBMIT  </button> </div> 
            <h4> {err} </h4>
       </form>
    </div>
  )
}