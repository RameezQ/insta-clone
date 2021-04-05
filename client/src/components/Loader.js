import React from 'react'
import { Spinner } from 'react-bootstrap';

const Loader = () => (
  <Spinner
    animation="border"
    role="status"
    style={{
      width: '100px',
      height: '100px',
      margin: 'auto',
      display: 'block'
    }}
  >
    <span className="sr-only">Loading...</span>
  </Spinner>
//   <div id="circle">
//   <div className="loader">
//     <div className="loader">
//         <div className="loader">
//            <div className="loader">

//            </div>
//         </div>
//     </div>
//   </div>
// </div> 
);

export default Loader;