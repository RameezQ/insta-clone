import { Tab, Tabs } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader'
import axios  from 'axios';
import { Form } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const StudentProfile = (props) => {
    const initialState = {
        name: "", fatherName: "", cell: "", inClass: "", course: "", rollNumber: "", address: "", photo: ""
    }
    const [article, setArticle] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const { name, fatherName, rollNumber, cell, course, inClass, address } = article
    const { id } = useParams()
    const [image, setImage] = useState('')
    const [url, setUrl] = useState("")

    useEffect(() => {
        fetch(`/student/profile/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setArticle(result)
            })
    }, [])
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
        article.photo = url?url:article.photo
        if ( !article.name || !article.fatherName || !article.cell || !article.inClass || !article.course || !article.rollNumber || !article.address
        ) return
        async function postArticle() {

            try {
                const response = await axios.put(`/student/${id}`, article, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    }
                });
                toast.info('🦄Student Recored update sccuessfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
             setArticle(response.data)

            } catch (error) {
                console.log(error)
            }
        }
        postArticle();
        //  props.history.push(`/studentlist`);
    }

    function handleCancel() {
        props.history.push("/studentlist")
    }

    return (
        <>
            <div className="container bootstrap snippet">
                <div className="row">
                    <div className="col-sm-10"><h3>{article.name}</h3></div>
                    {/* <div className="col-sm-2"><a href="/users" className="pull-right"><img title="profile image" className="img-circle img-responsive" src="http://www.gravatar.com/avatar/28fd20ccec6865e2d5f0e1f4446eb7bf?s=100" /></a></div> */}
                </div>
                <div className="row">
                    <div className="col-sm-3">{/*left col*/}
                        <div className="text-center">
                            <img src={url?url:article.photo} className="avatar img-circle img-thumbnail" alt="avatar" />
                            <h6>Upload a different photo...</h6>
                            <input type="file" className="text-center center-block file-upload" onChange={uploadFileHandler} />
                            {loading && <Loader />}
                        </div><br />
                       
                        <ul className="list-group">
                            <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x" /></li>
                            <li className="list-group-item text-right"><span className="pull-left"><strong>Shares</strong></span> 125</li>
                            <li className="list-group-item text-right"><span className="pull-left"><strong>Likes</strong></span> 13</li>
                            <li className="list-group-item text-right"><span className="pull-left"><strong>Posts</strong></span> 37</li>
                            <li className="list-group-item text-right"><span className="pull-left"><strong>Followers</strong></span> 78</li>
                        </ul>
                        <div className="panel panel-default">
                            <div className="panel-heading">Social Media</div>
                            <div className="panel-body">
                                <i className="fa fa-facebook fa-2x" /> <i className="fa fa-github fa-2x" /> <i className="fa fa-twitter fa-2x" /> <i className="fa fa-pinterest fa-2x" /> <i className="fa fa-google-plus fa-2x" />
                            </div>
                        </div>
                    </div>{/*/col-3*/}
                    <div className="col-sm-9">
                        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                            <Tab eventKey="home" title="Home">
                                <div className="container shadow">

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
                                    <h4 className="text-center pt-1">Update Student Record</h4>
                                    <hr />
                                    <div className="col-md-7 col-lg-11">
                                        <form onSubmit={handleSubmit}>
                                            <div class="row g-4">
                                                <div className="col-sm-6 form-group">
                                                    <label>Name</label>
                                                    <input name="name" type="text" value={article.name} onChange={handleChange} className="form-control" required />
                                                </div>

                                                <div className="col-sm-6 form-group">
                                                    <label>Roll Number</label>
                                                    <input name="rollNumber" type="number" value={article.rollNumber} onChange={handleChange} className="form-control" required />

                                                </div>

                                                <div className="col-sm-6 form-group">
                                                    <label>Father Name</label>
                                                    <input name="fatherName" type="text" value={article.fatherName} onChange={handleChange} className="form-control" required />
                                                </div>
                                                <div className="col-sm-6 form-group">
                                                    <label>Address</label>
                                                    <input name="address" type="text" value={article.address} onChange={handleChange} className="form-control" required />
                                                </div>


                                                <div className="col-sm-6 form-group">
                                                    <label>cell</label>
                                                    <input name="cell" type="text" value={article.cell} onChange={handleChange} className="form-control" required />
                                                </div>
                                                <div className="col-sm-6 form-group">
                                                    <label>Course</label>
                                                    <input name="course" type="text" value={article.course} onChange={handleChange} className="form-control" required />
                                                </div>


                                                <div className="col-sm-6 form-group">
                                                    <label>Class Name</label>
                                                    <input name="inClass" value={article.inClass} onChange={handleChange} className="form-control" required />
                                                </div>

                                               
                                            </div>
                                            <div className="btn-group float-right">
                                                <input type="submit" value="Submit" className="btn btn-primary " />
                                            </div>
                                            <button type="button" onClick={handleCancel} className="btn btn-secondary mb-5">Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="course" title="Course">
                                {/* <Sonnet /> */}
                            </Tab>
                            <Tab eventKey="marks" title="Marks" >
                                {/* <Sonnet /> */}
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>{/*/row*/}
        </>
    )
}

export default StudentProfile
