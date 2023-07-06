import React, { useEffect , useState} from 'react'
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
// import Users from './pages/Users'
// import AddUsers from './pages/AddUsers';
// import UpdateUsers from './pages/UpdateUsers';
// import Movies from './pages/Movies';
import GoogleSignInPage from './pages/GoogleSignInPage';
import useAuthToken from './components/hooks/useAuthToken';
// import LoginPage from './pages/LoginPage';
import DashBoardPage from './pages/DashBoard';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import LoginPage from './pages/LoginPage';
import LoadingScreen from './components/LoadingScreen';
// import VideoChat from './components/VideoChat';
// import DropDown from './components/DropDown';

const App = () => {
  
  const token = useAuthToken();
console.log("This is previous user"+token);

localStorage.removeItem('token'); 
const [isLoading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1000);
  return () => clearTimeout(timer);
}, []);


// console.log(userObject);
return (    
  <Router>
  <Routes>
   <Route path="/" element={isLoading?(
    <LoadingScreen/>):(<HomePage/>)}/>
   <Route path="/login" element={<LoginPage/>}/>
   <Route path="/dashboard" element={<DashBoardPage/>}/>
   <Route path="/loading" element={<LoadingScreen/>}/>
   {/* <Route path="/movies" element={<Movies/>}/>
   <Route path="/users" element={<Users />}/>
   <Route path="/add" element={<AddUsers />}/>
   <Route path="/update" element={<UpdateUsers />}/> */}
   </Routes>
 </Router>    

// {/* <div>
//   <div id='signInDiv'></div>
//   {
//     Object.keys(user).length !=0  &&
//     <button onClick={ (e) => handleSignOut(e)}>Sign out</button>
//   } 
//   {
//     Object.keys(user).length !=0  &&    
//     <button onClick={ (e) => handleRandomNumber(e)}>Generate Random Number</button>
//   }
//   {user && 
//   <div>
//     <img src={user.picture}></img>
//     <h3>{user.name}</h3>
//     </div>}
// </div> */}

  // <Router>
  //   <Routes>
  //   <Route path="/" element={<Users />}/>
  //   <Route path="/add" element={<AddUsers />}/>
  //   <Route path="/update" element={<UpdateUsers />}/>
  //   </Routes>
  // </Router>    
  )
}

export default App