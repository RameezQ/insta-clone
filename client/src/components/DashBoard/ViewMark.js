import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Loader'

import './viewMark.css'
const ViewMark = ({data,studentId}) => {
  // console.log(data.markSheet)
const {markSheet} =data?data:""
const {english,urdu,math,chemistry,biology,physics,islamyat,total} =markSheet?markSheet:""
const obtain =english+urdu+islamyat+chemistry
+physics+biology+math
const obtainMarks =JSON.stringify(obtain)
const perecntage =obtainMarks/total*100
const percentage = JSON.stringify(parseInt(perecntage))
const englishStatus = english<=25?<span className="text-danger">Fail</span>:<span className="text-success">Pass</span>
// const statusEnglish = circularjson.stringify(englishStatus)
// console.log(statusEnglish)
const urduStatus =urdu<=25?<span className="text-danger">Fail</span>:<span className="text-success">Pass</span>
const mathStatus =math<=32?<span className="text-danger">Fail</span>:<span className="text-success">Pass</span>
const chemistryStatus =chemistry<=32?<span className="text-danger">Fail</span>:<span className="text-success">Pass</span>
const physicsStatus =physics<=32?<span className="text-danger">Fail</span>:<span className="text-success">Pass</span>
const bioStatus =biology<=32?<span className="text-danger">Fail</span>:<span className="text-success">Pass</span>
const grade = JSON.stringify(perecntage<=32 && "Grade F Best of luck for next attempt"||perecntage<=40 && "Grade D Pass"
||perecntage<=50 && "Grade C Pass"||perecntage<+60 &&"Grade C+ Pass"||perecntage<=70 && "Grade B Pass"||perecntage<=80 && "Grade B+ Pass"||perecntage<90&&"Grade A Pass"||perecntage>90&&"Grade A+ Pass")
function handleSubmit() { 
    async function postArticle() {
      data.studentId=studentId._id
      data.markSheet.percentage=perecntage
      data.markSheet.obtainMarks=obtainMarks
      data.markSheet.grade=grade
      // data.markSheet.englishStatus=circularjson.stringify(englishStatus)
      try {
        const response = await axios.post('/marksheet', data); 
        // props.history.push(`/articles/${response.data._id}`);  
      } catch(error) {
        console.log('error', error);
      }
    }
    postArticle();
  }  
return (
    <>
    {data?
        <div className="card">
        <div className="card-header card-header-primary">
            <h4 className="card-title">View MarkSheet</h4>
            <p className="card-category">This is for Dispaly </p>
            <div className="card-avatar float-right"style={{marginTop:"-60px"}}>
                                <Link to="#pablo">
                                    <img className="img" src={studentId.photo} alt="no image"height="80"width="80"className="img-circle"/>
                                </Link>
                            </div>
            {/* <div className="float-right " style={{marginTop:"-60px"}}>
                <img src={studentId.photo} alt="no image" height="100px"width="100px"></img>
            </div> */}
        </div>
        
        <div className="card-body">
              
                <div className="stats">
                  <div>
                    <strong>English</strong> {english } {" "} {englishStatus}
                  </div>
                  <div>
                    <strong>Urdu</strong> {urdu} {" "} {urduStatus}
                  </div>
                  <div>
                    <strong>Islamyat</strong> {islamyat} {" "} {islamyat}
                  </div>
                </div>
                <div className="stats">
                  <div>
                    <strong>Chemistry</strong> {chemistry} {" "} {chemistryStatus}
                  </div>
                  <div>
                    <strong>Biology</strong> {biology} {" "} {bioStatus}
                  </div>
                  <div>
                    <strong>Physics</strong> {physics}{" "} {physicsStatus}
                  </div>
                </div>
                <div className="stats">
                  <div>
                    <strong>Math</strong> {math} {" "} {mathStatus}
                  </div>
                  <div>
                    <strong>Pak Study</strong> 562
                  </div>
                  <div>
                    <strong>DECLINED</strong> 182
                  </div>
                </div>
                <div className="dates">
                  <div className="start">
                    <strong>Total</strong> {total}
                    <span />
                  </div>
                  <div className="ends">
                    <strong>Obtain Mark</strong> {obtainMarks}
                  </div>
                 
                </div>
                <div className="dates">
                  <div className="start">
                    <strong>Percentage</strong> {percentage}%
                    <span />
                  </div>
                  <div className="ends">
                    <strong>Grade</strong> {grade}
                  </div>
                
                 
                </div>
               <div> 
                   <button  className="btn btn-primary" onClick={()=>handleSubmit()}>Submit</button>
                 </div>
               
                </div>
              
            </div> 
    :""}
       </>
    )
}

export default ViewMark
