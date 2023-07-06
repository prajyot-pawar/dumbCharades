import {React,useState} from 'react'
import BackgroundImage from '../assets/images/BackgroundImage.jpg';
import playbutton from '../assets/images/playbutton.svg';
// import '../index.css';
import '../styles/custom.css'
import useWindowDimensions from '../components/GetHeightWidth';
import PlayButton from '../components/PlayButton';
import LoginPage from './LoginPage';

// import ImgAsset from '../public'

export default function HomePage () {
  
  const { height, width } = useWindowDimensions();
  
  console.log("height is " + height)
  console.log("Width is " + width)
     
  const handleMove = () => {    
    isCloseContainer?handleCloseContainer:'';
    setIsMoved(!isMoved);
   };
 
  const handleCloseContainer = () => {
    setIsCloseContainer(!isCloseContainer);
     console.log("Container is going to be closed")
   };
 
  const [isMoved, setIsMoved] = useState(false);
  const [isCloseContainer, setIsCloseContainer] = useState(false);
	return (
           <div className="frame flex items-center justify-center h-screen w-screen overflow-hidden bg-slate-50 ">
                 <link rel="preconnect" href="https://fonts.googleapis.com"/>
                 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                 <div className=" relative bg-cover bg-center h-full">
                    <img src={BackgroundImage} className=" relative h-full w-full overflow-hidden scale-x-125 inset-0 animate-[scale_30s_linear_infinite]" alt="Backgorund Image"/>
                    <iframe src="iframe" loading="lazy"></iframe>
                    <div className="text-layer backdrop-blur-none absolute left-0 w-full h-full flex items-center justify-center  animate-[glow_1s_ease-in-out_infinite_alternate]">
                         <div className="text-center">
                              <h1 id="title" className={` text-5xl sm:text-7xl lg:text-8xl font-outline-2-title text-white text-center font-righteous ${isMoved ? 'moveup' : '' } p-10`}>DumbCharades</h1>
                           <div className={`relative  ${isMoved ? "scaled-down" : ""} rounded-full bg-gradient-to-l from-green-200 via-green-300 to-blue-500 4` } onClick={!isMoved?handleMove :''}>
                              <div className={`${isMoved ? "scaled-down" : ""} text-white py-2 px-1 transition-transform duration-100 `}>
                               {/* <svg src={playbutton}></svg> */}
                               <PlayButton className={`${isMoved ? "scaled-down" : ""}transition-transform duration-100`}/>
                              </div>                             
                              </div>
                              
                              </div>
                              </div>
                              
                              {isMoved && 
                               <div className={`text-layer3  flex items-center  justify-center h-110  w-96   ` }   >
                                <div className= {` ${isMoved ? "scale-up-from-zero h-full  w-96 rounded-lg bg-white " : "" } ${isCloseContainer? "scaled-down ":''} `}>       
                                {/* <div className='text-black'>Login</div>                          */}
                                <span className="absolute -top-1 -right-1 m-0 text-6xl text-white cursor-pointer bg-blue-500 rounded-lg"  onClick={handleMove}>&times;</span>
                                <LoginPage/>
                                </div>
                              </div>}
                              </div>
               {/* <img src={BackgroundImage} alt="Background image" /> */}
               </div>
	)
}

