import React, {useState, useEffect} from 'react'
import axios from 'axios'
//import SearchBox  from 'components/LicensesPages/SearchBox'

export default function Home() {
  const [licenses, setlicenses] = useState([])
  const [currenttoken, setToken] = useState('')

 
  
  
  const getLicenses = async (currenttoken) =>{
        const res = await axios.get('/api/licenses', {
            headers:{Authorisation: currenttoken}
        })
        setlicenses(res.data)
    }
  
  //this.setState(licenses);
  
  const SearchBox = ({placeholder,handleChange}) =>{
  
   return(
     <input type= 'serach'
     className = 'search'
      placeholder={placeholder}
      onChange = {handleChange} />
     )  
  }
  
  //grabs the users jwttoken and sets the function to get licenses to take that token as the argument.
  useEffect(() => { 
    const currenttoken = localStorage.getItem('jwt')
    setToken(currenttoken)
    if(currenttoken){
      getLicenses(currenttoken)
        }
    
    }, [])

  

  
   const addbutton= (licenseID) => {
     if (localStorage.getItem('r') == "01234"){
       
         return<div> <button id="approve" name="approve" value = {licenseID} className="changeButton" onClick={buttonaction}> Approve </button>  &nbsp;
                     <button id = "reject" name="reject" value = {licenseID} className="changeButton" onClick={buttonaction}> Reject </button> &nbsp; 
                     <button id="suspend"  name="suspend" value = {licenseID} className="changeButton" onClick={buttonaction}> Suspend </button> 
                </div>
     }else{
       return <h1></h1>
     }
   }
     
    
   const buttonaction = async (e) =>{
     
     let newstatus = "";
      
     switch(e.target.id) {
       case "approve":
         newstatus = "accepted"
         alert("This license application has been approved")
         window.location.reload();
         break;
       case "reject":
         newstatus = "rejected"
         alert("This license application has been rejected")
         window.location.reload();
         break;
       case  "suspend":
         newstatus = "pending"
         alert("This license application has been set to pending")
         window.location.reload();
         break;     
         
     }
    
       try{
            const license_id = e.target.value;           
            const currenttoken = localStorage.getItem('jwt')            
            const updateInfo = {license_id, newstatus}
            const res = await axios.post('/api/licenses/update', updateInfo,{
              headers:{Authorisation: currenttoken}                                              
            })
            console.log(res.data.msg)

        }catch(err){
         // err.response.data.errmsg && setErr(err.response.data.errmsg)
          console.log(err);
        }                          
      
    } 

 
  return (
    <div  className="license-container">
    
      
       <h1 className="license-header"> All Current Applications </h1>
     
       
    
      {   
     
          licenses.map(license => (
            <div className="object">
                <h3 className="objectheader"> {license.companyname} </h3>
                <div className="details"> <p> Details: {license.details} </p></div>
                <div className="bottomrow"> 
                  <p className="statustext"> Status: {license.status} </p> 
                  <p className="username"> Name : {license.name} </p> 
                </div>
                {addbutton(license._id)}
              </div>
           ))
      }
      
   
    </div>
  )
}