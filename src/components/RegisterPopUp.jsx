import React from "react";
 
const Popup = (props) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-filter backdrop-blur-md">
      <div className="relative w-[60%] max-h-[80vh] mt-[calc(100vh - 95vh - 20px)] rounded border overflow-auto p-5 border-solid border-[#999] bg-[#50d71e]">
        {/* <span
          className="absolute top-0 right-0 m-0 text-xl text-white cursor-pointer"
          onClick={props.handleClose}
        >
          &times;
        </span> */}
        {props.content}
      </div>
    </div>
  );
};

export default Popup;


//ye mt dekho



// const handlePopupClose = () => {
//   togglePopup();
// };

// const handleInputChange = (event) => {
//   setGamerId(event.target.value);
// };

// const handleGamerIdTag = () => {
//   togglePopup();  
// };

// const togglePopup = () => {
//   setIsOpen(!isOpen);
// }


// const handleSubmitGamerId = async (e) => {
//   e.preventDefault();
//   console.log('handleSubmitGamerId is being processed');
//   try {
//    decodedCurrentUser.gamer_id=gamer_id;
//     navigate("/")
//   }
//   catch(err){
//     console.log(err);
//   }
// };

// const PopupContent = (
//   <>
//     <b>Design your Popup</b>
//     <label>Tag:
//       <input type="text" value={gamer_id} onChange={handleInputChange} />
//     </label>
//     <button onClick={handleSubmitGamerId}>Submit</button>
//   </>
// );