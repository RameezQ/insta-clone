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
const englishStatus = english<=25?"Fail":"Pass"
const urduStatus = urdu<=25?"Fail":"Pass"
const mathStatus =math<=32?"Fail":"Pass"
const chemistryStatus =chemistry<=32?"Fail":"Pass"
const physicsStatus =physics<=32?"Fail":"Pass"
const bioStatus =biology<=32?"Fail":"Pass"
const islamyatStatus=islamyat<=32?"Fail":"Pass"
const grade = JSON.stringify(perecntage<=32 && "Grade F Best of luck for next attempt"||perecntage<=40 && "Grade D Pass"
||perecntage<=50 && "Grade C Pass"||perecntage<+60 &&"Grade C+ Pass"||perecntage<=70 && "Grade B Pass"||perecntage<=80 && "Grade B+ Pass"||perecntage<90&&"Grade A Pass"||perecntage>90&&"Grade A+ Pass")
function handleSubmit() { 
    async function postArticle() {
      data.studentId=studentId._id
      data.markSheet.percentage=perecntage
      data.markSheet.obtainMarks=obtainMarks
      data.markSheet.grade=grade
      
      data.markSheet.urduStatus=urduStatus
      data.markSheet.englishStatus=englishStatus
      data.markSheet.islamyatStatus=islamyatStatus
      data.markSheet.physicsStatus=physicsStatus
      data.markSheet.chemistryStatus=chemistryStatus
      data.markSheet.bioStatus=bioStatus
      data.markSheet.mathStatus=mathStatus
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
                    <strong>English</strong> {english } {" "} <span className={englishStatus==="Pass"?"text-success":"text-danger"}>{englishStatus}</span>
                  </div>
                  <div>
                    <strong>Urdu</strong> {urdu} {" "}<span className={urduStatus==="Pass"?"text-success":"text-danger"}>{urduStatus}</span>
                  </div>
                  <div>
                    <strong>Islamyat</strong> {islamyat} {" "} <span className={islamyatStatus==="Pass"?"text-success":"text-danger"}>{islamyatStatus}</span>
                  </div>
                </div>
                <div className="stats">
                  <div>
                    <strong>Chemistry</strong> {chemistry} {" "} <span className={chemistryStatus==="Pass"?"text-success":"text-danger"}>{chemistryStatus}</span> 
                  </div>
                  <div>
                    <strong>Biology</strong> {biology} {" "} <span className={bioStatus==="Pass"?"text-success":"text-danger"}>{bioStatus}</span>
                  </div>
                  <div>
                    <strong>Physics</strong> {physics}{" "} <span className={physicsStatus==="Pass"?"text-success":"text-danger"}>{physicsStatus}</span>
                  </div>
                </div>
                <div className="stats">
                  <div>
                    <strong>Math</strong> {math} {" "} <span className={mathStatus==="Pass"?"text-success":"text-danger"}>{mathStatus}</span>
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
