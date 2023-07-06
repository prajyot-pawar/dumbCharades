// import React from 'react'
import React, { useEffect, useRef, useState } from 'react'
import {useLocation,  useNavigate} from 'react-router-dom';
import axios from 'axios'
import Popup from '../components/RegisterPopUp';
import PlayButton from '../components/PlayButton';
import BackgroundImage from '../assets/images/BackgroundImage.jpg';

const DashBoardPage = () => {  
  
 const navigate =useNavigate();    
 const location = useLocation(); 
 var currentUser = location.state?.current_user;
 var currentUser_email = location.state?.current_user.email;
 var isTagPresent = useRef(false);    
 const [isOpen, setIsOpen] = useState(false);
 var [gamer_id, setGamerId] = useState({});  
 const [isSpaceEntered, setIsSpaceEntered] = useState(false);
 const [tag, setTag] = React.useState('Rookie');


 
const handlePopupClose = () => {
  togglePopup();
};

const options = [

  { label: 'LevelUp', value: 'LevelUp' },
  { label: 'Pro ', value: 'Pro ' },
  { label: 'Noob  ', value: 'Noob  ' },
  { label: 'Bot   ', value: 'Bot   ' },
  { label: 'PWN    ', value: 'PWN    ' },

];


const handleGamerIdInputChange = (event) => {
  setGamerId(event.target.value);
  preventDefault
  if (event.target.value.includes(' ') || event.target.value.includes(' ') ) {
    setIsSpaceEntered(true);
  } else {
    setIsSpaceEntered(false);
    setGamerId(event.target.value);
  }
};

const handleTagInputChange = (event) => {       
  setTag(event.target.value);
};

const togglePopup = () => {
  setIsOpen(!isOpen);
}

const handleGamerIdTag = () => {
  togglePopup();  
};


const handleSubmitGamerIdTag = async (e) => {
  try {
    const response = await axios.put(`http://localhost:8800/user/${currentUser_email}/gamer_id/tag`, {
      gamer_id: currentUser.gamer_id,
      tag: currentUser.tag,      
    });
    console.log(response.data);
  }
  catch(err){
    console.log(err);
  }
};


const handleSubmitGamerId = async (e) => {
  e.preventDefault();
  console.log('handleSubmitGamerId is being processed and gamerid is ' + gamer_id);
  console.log('tag is ' + tag);
  try {
    currentUser.gamer_id=gamer_id;
    currentUser.tag=tag;
    console.log(currentUser.gamer_id);
    handleSubmitGamerIdTag();
    handlePopupClose();
    // navigate("/dashboard")
  }
  catch(err){
    console.log(err);
  }
};

const PopupContent = (
  <><div className=' flex-col items-center justify-center '>
  <b className="justify-center text-center items-center">New here? 👋</b>
  <br/>
  <div className="py-4 px-4">
    <div className='py-4'><b className="py-9 ">Userid:</b>
    <label>
      <input type="text" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800"value={gamer_id.current} onChange={handleGamerIdInputChange} />
    </label>
    {isSpaceEntered && <p className="text-red-500">Spaces are not allowed in the Gamer ID.</p>}
</div>
<div className='py-1'>
<b className='py-1'>Choose a Tag :</b>
     <select value={tag} onChange={handleTagInputChange}>       
       {options.map((option) => (
         <option value={option.value}>{option.label}</option>
       ))}
     </select>
</div>
<div className='justify-center text-center items-center py-2'>
    { !isSpaceEntered &&
    <button onClick={handleSubmitGamerId} className=' bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>Submit</button>
    }    
    </div>
  </div>
     </div>
     </>
);

 const initMethod = async (e) => {
  console.log("Current user ka mail :" + currentUser_email)
  const response = await axios.get("http://localhost:8800/user/" + currentUser_email)
  const data = response.data;  
  console.log("Does data exist?"+ data.exists);
  console.log("THis is Gamer ID  : "+ data.gamerId);
  console.log("THis is Tag : "+ data.tag);
  if(data.gamerId =="" || data.gamerId == undefined ){
    isTagPresent.current=false;
    console.log("Gamer id is absent ="+ Boolean(isTagPresent));
    handleGamerIdTag();
    console.log("Gamer ID function chala diya")
  }
  else{    
  console.log("New GamerID is  " + data.gamerId );
  }

  const response2 = await axios.get("http://localhost:8800/user/" + currentUser_email)
  const data2 = response2.data;  
  console.log("Does data exist?"+data2.exists);
  console.log("New GamerID is  " +data2.gamerId );
 }
 
//  var isTagPresent= initMethod();
    
 useEffect(() => {
  console.log('useEffect ran. count is: ', currentUser_email);    
  initMethod();
}, [currentUser_email]); 
 

function handleSignOut (event) {
  localStorage.removeItem('token');  
  navigate('/');
  currentUser= 0;
}

  return (
    <div className="frame flex items-center justify-center h-screen w-screen overflow-hidden ">

<div className=" relative bg-cover bg-center h-full">
                    <img src={BackgroundImage} className=" relative h-full w-full overflow-hidden scale-x-125 inset-0 animate-[scale_30s_linear_infinite]" alt="Backgorund Image"/>
                    </div>
    <div className="text-layer backdrop-blur-sm absolute rounded-3xl bg-slate-50 shadow- w-96 h-96 flex items-center justify-center">
    <div className='flex-col items-start justify-start '>
   <img src={currentUser.imageUrl} className='h-32 w-32 rounded-full object-cover' alt="User Avatar" />
    {/* <p>First Name: {currentUser.fname}</p>
    <p>Last Name: {currentUser.sname}</p> */}
    
    <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800"> {currentUser.fname}</h1>
        <h2 className="text-xl text-gray-600">{currentUser.sname}</h2>
        <p className="text-gray-500">{currentUser_email}</p>
      </div>     
    
  {
    Object.keys(currentUser).length !=0  &&
    <button onClick={ (e) => handleSignOut(e)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 gap-5 rounded'>Sign out</button>
  } 
    </div>
  
  {isOpen &&  Object.keys(currentUser).length !=0  && (
        <Popup content={PopupContent} handleClose={handlePopupClose} className="text-layer" />
      )}      
 </div>
 </div>
    
  )
}

export default DashBoardPage;