// import React from 'react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
// import Users from './Users';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import useAuthToken from '../components/hooks/useAuthToken';


const GoogleSignInPage = (isAlreadyPresent_email) => {
  
  // const { setDecodedCurrentUser } = useContext(UserContext);  
     
  var number = 0;
  const [user, setUser] = useState({});
  const [decodedCurrentUser, setdecodedCurrentUser] = useState({});
  var [number, setNumber] = useState({});   
  var isAlreadyPresent_email = useRef(false);
  var isAlreadyPresent_tag_gameid = useRef(false);  
  const [isSignOut, setIsOpen] = useState(false);
  
  const navigate =useNavigate();
  
  function handleCallbackResponse(response){
    console.log("encoded JWT ID token : "+ response.credential); 
    localStorage.setItem('token', response.credential);  
      
    console.log("Stored JWT ID token : "+ localStorage); 
    const userObject = jwt_decode(response.credential);
    // console.log(userObject);
    setUser(userObject);
    let decodedUser = {      
      userid : userObject.given_name,
      fname : userObject.given_name,
      sname : userObject.family_name,
      imageUrl : userObject.picture,
      email : userObject.email,
      tag : "",
      friends: "",
    };
    console.log(decodedUser);
    setdecodedCurrentUser(decodedUser);
    console.log("This is "+decodedCurrentUser);
    document.getElementById("signInDiv").hidden=true;
  }         
    
  useEffect(() => {
    console.log('useEffect ran. count is: ', decodedCurrentUser);    
    handleAlreadyPresent();
  }, [decodedCurrentUser]); // 👈️ add state variables you want to track
  
  const handleAlreadyPresent = async (e) => {
    // e.preventDefault();
    try {
      console.log(decodedCurrentUser.email);
      const response = await axios.get("http://localhost:8800/user/" + decodedCurrentUser.email)
      const data = response.data;            
      console.log(Boolean(data.exists));
      console.log(data.gamerId);
      console.log(data.tag);
      // console.log("Yeah toh present hai " + isAlreadyPresent_email);
      if (data.exists === true) {        
  // <MyComponent/>
        isAlreadyPresent_email.current = true;             
      // const gameidtag_response = await axios.get("http://localhost:8800/user/" + decodedCurrentUser.email)
        if(data.tag=="" || data.gamer_id==""){
          isAlreadyPresent_tag_gameid.current=true;
          console.log("Gamer id is present ="+ Boolean(isAlreadyPresent_tag_gameid))
        }
        console.log("Already Present hai ");        
        navigate('/dashboard',{state:{current_user:decodedCurrentUser}});
      }
      else if(data.exists==false){
       handleInsert();       
      }
      // navigate("/")
    }
    catch(err){
      console.log(err);
    }
 };

 
 function refreshPage() {
  window.location.reload(true);
}

function handleSignOut (event) {
  localStorage.removeItem('token');  
  document.getElementById("signInDiv").hidden = false;
  setUser({});  
  localStorage.removeItem('token');  
  navigate('/');
  currentUser= 0;
}
  
const handleInsert = async (e) => {
  // e.preventDefault();
  console.log("THis is going to be posted : " + decodedCurrentUser);
  try {
    await axios.post("http://localhost:8800/user",decodedCurrentUser)
    // navigate("/")
  }
  catch(err){
    console.log(err);
  }
};


// const handleGamerIdTag = async (e) => {
//   <MyComponent/>
// };


useEffect(()=> {
  /* global google */
console.log('user is :' + user);
const storedToken = localStorage.getItem('token');
if(storedToken){
  const userObject = jwt_decode(storedToken);
  setUser(userObject);
}
  google.accounts.id.initialize({
    client_id : "445783285999-6o7b4lvidm8ma4jakra6fofqiqn1olsg.apps.googleusercontent.com",
    callback: handleCallbackResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    {theme: "outline",size:"large"}
  );
  google.accounts.id.prompt();

},[])        


  return (    

<div className='bg-transparent'>
  {    
    Object.keys(user).length ==0  &&
    <div id='signInDiv'></div>
  }  
  {user && 
  <div>
    <img src={user.picture}></img>
    <h3>{user.name}</h3>
    </div>
    }
    
  {
    Object.keys(user).length !=0  &&
    <button onClick={ (e) => handleSignOut(e)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 gap-5 rounded'>Sign out</button>
  } 
    {
    Object.keys(user).length !=0  &&      
    <Link to="/movies" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>
    <button className=''>Random Movie Generator</button>
  </Link>
    }    
    {
    Object.keys(user).length !=0  &&    
      <Link to="/users" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>
      <button className=''>List Users</button>
    </Link>
      }
      
    {/* {
      isAlreadyPresent_tag_gameid!=true && Object.keys(user).length !=0 &&
      <RegisterPopUp/>
    } */}
</div> 
  )
}

export default GoogleSignInPage;