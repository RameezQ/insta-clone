
import React, { useState } from "react";
import Loader from '../Loader'
import { post } from 'axios';
import { Form } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
function AddStudent(props) {
  const initialState = {
    name: "rameez", fatherName: "qamar",
    cell: "0306", inClass: "9th", course: "pre-end", rollNumber: "12", address: "chah", photo: ""
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
    if (!article.photo || !article.name || !article.fatherName || !article.cell || !article.inClass || !article.course || !article.rollNumber || !article.address
    ) return
    async function postArticle() {

      try {
        const response = await post('/createpost', article, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        });
        toast.success('Student Recored added sccuessfully!', {
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
    props.history.push("/studentlist");
  }

  return (
    <>

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
      <div className="row " >
        <div className="col-md-12">
          <div className="card">
            <div className="card-header card-header-primary">
              <h4 className="card-title">Create new Student Profile</h4>
              <p className="card-category">Say Welcome in United School </p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Name</label>
                      <input name="name" type="text" value={article.name} onChange={handleChange} className="form-control" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Father Name</label>
                      <input name="fatherName" type="text" value={article.fatherName} onChange={handleChange} className="form-control" required />

                    </div>
                  </div>
                 
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Mobile Number</label>
                      <input name="cell" type="text" value={article.cell} onChange={handleChange} className="form-control" required />

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Course</label>
                      <input name="course" type="text" value={article.course} onChange={handleChange} className="form-control" required />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Standard</label>
                      <input name="cell" type="text" value={article.inClass} onChange={handleChange} className="form-control" required />

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Roll Number</label>
                      <input name="course" type="text" value={article.rollNumber} onChange={handleChange} className="form-control" required />
                    </div>
                  </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Address</label>
                      <input name="address" type="text" value={article.address} onChange={handleChange} className="form-control" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="image">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="text"
                        name="text"
                        placeholder="Enter image url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                      <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler} required />
                      {loading && <Loader />}
                    </Form.Group>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary pull-right">Create Profile</button>
                <div className="clearfix" />
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddStudent;


