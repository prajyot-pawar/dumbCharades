// import React, { useEffect, useRef } from 'react';
// import SimplePeer from 'simple-peer';
// import Webcam from 'react-webcam';

// const VideoChat = () => {
//   const webcamRef = useRef(null);
//   const peerRef = useRef(null);
//   const mediaConstraints = { audio: true, video: true };

//   useEffect(() => {
//     // Initialize SimplePeer instance
//     peerRef.current = new SimplePeer({ initiator: true, stream: webcamRef.current.stream });

//     // Handle receiving signal/data from remote peer
//     peerRef.current.on('signal', (signal) => {
//       // Send the signal to the remote peer (e.g., using WebSocket or signaling server)
//       console.log('Send signal to remote peer:', signal);
//     });

//     // Handle receiving stream from remote peer
//     peerRef.current.on('stream', (stream) => {
//       // Use the stream for video display (e.g., assign it to a <video> element)
//       // Example: videoRef.current.srcObject = stream;
//     });

//     // Clean up the SimplePeer instance
//     return () => {
//       peerRef.current.destroy();
//     };
//   }, []);

//   return (
//     <div>
//       <Webcam ref={webcamRef} audio={true} video={true} />
//       {/* Add UI elements for video display and call controls */}
//     </div>
//   );
// };

// export default VideoChat;
