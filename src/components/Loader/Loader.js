// import React, { useEffect, useState } from "react";
// import "./Loader.css"; // Import the CSS file

// const Preloader = () => {
//   const [hidden, setHidden] = useState(false);
//   const [fadeOut, setFadeOut] = useState(false);

//   useEffect(() => {
//     const timer1 = setTimeout(() => {
//       setFadeOut(true);
//     }, 2000); // Start fading out after 2 seconds

//     const timer2 = setTimeout(() => {
//       setHidden(true);
//     }, 3000); // Hide after the fade-out is complete

//     return () => {
//       clearTimeout(timer1);
//       clearTimeout(timer2);
//     };
//   }, []);

//   if (hidden) return null;

//   return (
//     <div className={`loader ${fadeOut ? "fade-out" : ""}`}>
//       <p>Relax. we got you.</p>
//     </div>
//   );
// };

// export default Preloader;


import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-leaf"></div>
      <p>Loading Deliciousness...</p>
    </div>
  );
};

export default Loader;
