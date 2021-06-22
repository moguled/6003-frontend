import './App.css';
import axios from 'axios'
import React, {useEffect, useState} from 'react';
import SignIn from './components/signin'
import Licenses from './components/licenses'

function App() {
  
  const [isLogin, loggedIn] = useState(false);
   
  
    {/*This checks the jwt token that is returned from the backend to verify that the correct user is logged in */}
    useEffect(() =>{ const verifyLogin = async () =>{                                            
      const usertoken = localStorage.getItem('jwt'); {/* grabs the token from localstorage after its stored.*/}
      {/* if a token is found in localstorage */}
      if(usertoken){
        {/* frontend verify route sends back a header containing the jwttoken. compared against JWT SECRET  */}
        const verifyRequest = await axios.get('api/users/authenticate',{
          headers:{ Authorisation: usertoken}
        })
        console.log(verifyRequest)
        {/* keeps LoggedIn status as true if the data comes back true */}
        loggedIn(verifyRequest.data)
        if(!verifyRequest.data) {
          return localStorage.clear()
        }
      }else{
        loggedIn(false)
      }
    }
    verifyLogin()
  }, [])
 
  
  return (
    <div className="App">
    
    {/*This protects the licenses route against non-signed in users. */}
      
      {
        isLogin 
        ? <Licenses loggedIn={loggedIn} /> : <SignIn  loggedIn={loggedIn} />
      }  
        
    </div>
  );
}

export default App;
