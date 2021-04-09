import React, { useState } from 'react'
import './Steper.css'
import Moment from 'react-moment';
import axios from 'axios';
const Steper = ({student,name}) => {



    return (
        <>
         {student.reverse().slice(0,5).map(p=> 
          <div className="how-it-work clearfix">
            <div className="panel panel-default col-sm-12">
              <div className="panel-body">
                <span> {p.paid} </span> <h3 className="step-heading"> {name} </h3>
              Total: {p.totalFee}  {" "}<br></br> Date: {p.month? <Moment format="D MMM YYYY">{p.month}</Moment>:""}
              </div>
             
            </div>
          </div>
            
                )} 
        </>
   
      
    )
}

export default Steper
