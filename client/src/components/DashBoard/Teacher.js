import React, { useState } from "react";
import Loader from '../Loader'
import { post } from 'axios';
import { Form } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function Teacher(props) {
  const initialState = {
    name: "rameez", fatherName: "qamar", cell: "0306", teacherId: "12", address: "chah", photo: "", classOfTeach: "9th", education: "mcs",
    subject: "math", salary: "1200", reference: "abc", idCard: "123445"
  }
  const [article, setArticle] = useState(initialState)
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  function handleChange(event) {
    setArticle({ ...article, [event.target.name]: event.target.value })
  }


  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append("upload_preset", "sanpak")
    data.append("cloud_name", "rameezqamar")
    setLoading(true);

    fetch("https://api.cloudinary.com/v1_1/rameezqamar/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  };
  function handleSubmit(event) {
    event.preventDefault();
    article.photo = url
    if (!article.photo || !article.name || !article.fatherName || !article.cell || !article.address || !article.subject || !article.education
      || !article.idCard || !article.teacherId || !article.reference || !article.salary || !article.classOfTeach) return
    async function postArticle() {

      try {
        const response = await post('/teacher', article, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        });
        toast.success('Teacher Recored added sccuessfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });


      } catch (error) {
        console.log(error)
      }
    }
    postArticle();
    //  props.history.push(`/studentlist`);
  }

  function handleCancel() {
    props.history.push("/teacherlist");
  }

  return (
   
        <div className="row " >
          <div className="col-md-12">
            <div className="card">
              <div className="card-header card-header-primary">
                <h4 className="card-title">Create Profile</h4>
                <p className="card-category">Complete your profile</p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="form-group">
                        <label className="bmd-label-floating">Name</label>
                        <input name="name" type="text" value={article.name} onChange={handleChange} className="form-control" required />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="bmd-label-floating">Father Name</label>
                        <input name="fatherName" type="text" value={article.fatherName} onChange={handleChange} className="form-control" required />

                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">Teacher ID</label>
                        <input name="teacherId" type="number" value={article.teacherId} onChange={handleChange} className="form-control" required />

                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">Mobile Number</label>
                        <input name="cell" type="number" value={article.cell} onChange={handleChange} className="form-control" required />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">Salary</label>
                        <input name="subject" type="text" value={article.salary} onChange={handleChange} className="form-control" required />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>CNIC</label>
                        <input name="idCard" value={article.idCard} onChange={handleChange} className="form-control" type="number" />
                      </div>

                    </div>
                  </div>

                  <div className="row">

                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">Education</label>
                        <input name="education" value={article.education} onChange={handleChange} className="form-control" required />

                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">Reference</label>
                        <input name="reference" value={article.reference} onChange={handleChange} className="form-control" type="text" />

                      </div>

                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="bmd-label-floating">Classes of Teach</label>
                        <input name="classOfTeach" value={article.classOfTeach} onChange={handleChange} className="form-control" required />

                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Subject of Teach</label>
                        <input name="subject" value={article.subject} onChange={handleChange} className="form-control" required type="text" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Address</label>
                        <input name="classOfTeach" value={article.address} onChange={handleChange} className="form-control" required />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <Form.Group controlId="image">
                          <Form.Label>Image</Form.Label>
                          {/* <Form.Control
                            type="text"
                            name="text"
                            placeholder="Enter image url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                          /> */}
                          <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler} />
                          {loading && <Loader />}
                        </Form.Group>
                      </div>
                    </div>
                    <div className="col-md-8 mt-4">
                        <div className="card card-profile">
                            <div className="card-avatar">
                                <Link to="#pablo">
                                    <img className="img" src={article.photo ? article.photo : url} />
                                </Link>
                            </div>
                           
                        </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary pull-right">Create Profile</button>
                  <div className="clearfix" />
                </form>

              </div>
            </div>
          </div>
        
     
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>



  );
}

export default Teacher;
