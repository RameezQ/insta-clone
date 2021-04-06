import axios from 'axios';
import { Field, FieldArray, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import Search from './Search'
import "react-datepicker/dist/react-datepicker.css";
const Fee = (props) => {
    const [users, setUsers] = useState([])
    const [student, setStudent] = useState("")
    const [fee, setFee] = useState({})
    const [studentId, setStudentId] = useState('')
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const [startDate, setStartDate] = useState(new Date());
    useEffect(function () {
        async function getArticles() {
            try {
                const response = await axios.get("/students");
                setUsers(response.data);
                
            } catch (error) {
                console.log('error', error);
            }
        }
        getArticles();
    }, []);
   
    console.log("feesss",fee)
    const fetchByName = (id) => {
        setStudent(id)
        setSearchQuery(id.name)
        setStudentId(id._id)
    }
   
    
    const checkExitFee =(id)=>{
      
            async function getArticles() {
                try {
                    const response = await axios.get(`/fee/${id?id:""}`);
                    setFee(response.data);
                } catch (error) {
                    console.log('error', error);
                }
            }
            getArticles();
     
    }

const handleSubmit=(values)=>{
    if(!fee.studentId){
        async function postArticle() {
           values.studentId=student._id
            try {
              const response = await axios.post('/fee', values,{
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem("jwt")
              }}); 
              // props.history.push(`/articles/${response.data._id}`);
              console.log(response)  
            } catch(error) {
              console.log('error', error);
            }
          }
          postArticle()
        }else {
            async function postArticle() {
                values.studentId=student._id
                 try {
                   const response = await axios.put(`/feeObjectId/${fee._id}`,values); 
                   // props.history.push(`/articles/${response.data._id}`);
                   console.log(response)  
                 } catch(error) {
                   console.log('error', error);
                 }
               }
               postArticle()
           
        }
     
}
    return (
        <div className="row">
            <div className="col-12">
                <Search users={users}
                 fetchByName={fetchByName} 
                 searchQuery={searchQuery}
                  search={Search} 
                  query={query}
                  checkExitFee={checkExitFee}
                   setSearchQuery={setSearchQuery} />
            </div>
            <div className="col-md-5">
            <div className="card">
                    <div className="card-header card-header-primary">
                        <h4 className="card-title">Make fee</h4>
                        <p className="card-category">United School Account Department </p>
                    </div>
                    <div className="card-body">
                    <Formik
                        initialValues={{
                            fee: {
                                // month: 80,
                                amount:70,
                                status: false,
                                paid:60,
                                remaining:0,
                                month:startDate
                            },
                            studentId:""
                        }}
                        onSubmit={(v)=>handleSubmit(v)}
                    >
                        <Form>

                            <div className="row">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Name</label>
                                        <Field name="name" type="text" value={student.name} readOnly className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Roll Number</label>
                                        <Field name="fatherName" type="text" value={student.rollNumber} className="form-control" readOnly />

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Standard</label>
                                        <Field name="teacherId" type="number" value={student.inClass} className="form-control" readOnly />

                                    </div>
                                </div>
                            </div>
                           

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Amount</label>
                                        <Field name="fee.amount" className="form-control"type="number" />

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Paid</label>
                                        <Field name="fee.paid" className="form-control"type="number" />

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Remaining</label>
                                        <Field name="fee.remaining" className="form-control" type="number" />
                                    </div>
                                   
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                    <label className="bmd-label-floating">Date/Month</label>
                                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} className="form-control"/>
                                    </div>
                                </div>
                               </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </Form>
                    </Formik>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Fee
