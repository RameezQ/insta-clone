
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Subjects = (props) => {
  
    const { name, rollNumber, inClass,_id} = props.studentId
    return (
        
                <div className="card">
                    <div className="card-header card-header-primary">
                        <h4 className="card-title">Make MarkSheet</h4>
                        <p className="card-category">Just Fill Required Field </p>
                    </div>
                    <div className="card-body">
                    <Formik
                        initialValues={{
                            markSheet: {
                                english: 80,
                                urdu: 70,
                                chemistry:60,
                                biology:50,
                                islamyat:40,
                                physics:20,
                                math:30
                            },
                        }}
                        onSubmit={values => {
                            // async function postArticle() {
                            //     values.studentId=_id
                            //     // data.urduStatus=urduStatus
                            //     try {
                            //       const response = await axios.post('/marksheet', values); 
                            //       // props.history.push(`/articles/${response.data._id}`);
                            //       console.log(response)  
                            //     } catch(error) {
                            //       console.log('error', error);
                            //     }
                            //   }
                            //   postArticle();
                            // console.log(values);
                            props.setData(values)
                        }}
                    >
                        <Form>

                            <div className="row">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Name</label>
                                        <Field name="name" type="text" value={name} readOnly className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Roll Number</label>
                                        <Field name="fatherName" type="text" value={rollNumber} className="form-control" readOnly />

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Standard</label>
                                        <Field name="teacherId" type="number" value={inClass} className="form-control" readOnly />

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">English</label>
                                        <Field name="markSheet.english" type="number" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Urdu</label>
                                        <Field name="markSheet.urdu" type="number" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Math</label>
                                        <Field name="markSheet.math" className="form-control" type="number" />
                                    </div>

                                </div>
                            </div>

                            <div className="row">

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Physics</label>
                                        <Field name="markSheet.physics" className="form-control" type="number"/>

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Chemistry</label>
                                        <Field name="markSheet.chemistry" className="form-control" type="number" />

                                    </div>

                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Biology</label>
                                        <Field name="markSheet.biology" className="form-control"type="number" />

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Islamyat</label>
                                        <Field name="markSheet.islamyat" className="form-control" type="number" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Total</label>
                                        <Field name="markSheet.total" className="form-control" type="number"/>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </Form>
                    </Formik>
                </div>
            </div>
           
    )
}
export default Subjects