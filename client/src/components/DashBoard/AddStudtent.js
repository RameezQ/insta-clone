// import React,{useState,useEffect} from 'react'
// import M from 'materialize-css'
// import '../../App.css'
// import {useHistory} from 'react-router-dom'

// const AddStudent = ()=>{
//     const history = useHistory()
//     const [info, setInfo] = useState({name:"rameez",
//     fatherName:"qamar",cell:"0306",inClass:"9th",course:"pre-end",rollNumber:"abc12",address:"chah"})
//     const [image,setImage] = useState("")
//     const [url,setUrl] = useState("")
//     const{name,rollNumber,cell,course,inClass,fatherName,address} =info
//     useEffect(()=>{
//        if(url){
//         fetch("/createpost",{
//             method:"post",
//             headers:{
//                 "Content-Type":"application/json",
//                 "Authorization":"Bearer "+localStorage.getItem("jwt")
//             },
//             body:JSON.stringify({
//                 name,
//                 fatherName,
//                 // photo:url,
//                 cell,
//                 address,
//                 inClass,
//                 course,
//                 rollNumber
//             })
//         }).then(res=>res.json())
//         .then(data=>{

//            if(data.error){

//                M.toast({html: data.error,classes:"#c62828 red darken-3"}) 
//            }
//            else{
//                M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
//                history.push('/studentlist')
//            }
//         }).catch(err=>{
//             console.log(err)
//         })
//     }
//     },[url])

//    const postDetails = ()=>{
//        const data = new FormData()
//        data.append("file",image)
//        data.append("upload_preset","sanpak")
//        data.append("cloud_name","rameezqamar")
//        fetch("https://api.cloudinary.com/v1_1/rameezqamar/image/upload",{
//            method:"post",
//            body:data
//        })
//        .then(res=>res.json())
//        .then(data=>{
//           setUrl(data.url)
//        })
//        .catch(err=>{
//            console.log(err)
//        })


//    }

//    const handleChange = (e) => setInfo({ ...info, [e.target.name]: e.target.value });

//    return(
//        <div className="card input-filed"
//        style={{
//            margin:"30px auto",
//            maxWidth:"500px",
//            padding:"20px",
//            textAlign:"center"
//        }}
//        >
//              <input 
//            type="text"
//             placeholder="Roll Number"
//             name="rollNumber"
//             value={rollNumber}
//             name="rollNumber"
//             onChange={handleChange}
//             />
//            <input 
//            type="text"
//             placeholder="name"
//             name="name"
//             value={name}
//             onChange={handleChange}
//             />

//            <input
//             type="text"
//              placeholder="fatherName"
//              value={fatherName}
//              name="fatherName"
//             onChange={handleChange}
//              />
//               <input
//             type="text"
//              placeholder="address"
//              value={address}
//              name="address"
//             onChange={handleChange}
//              />
//               <input
//             type="text"
//              placeholder="Class Name"
//              value={inClass}
//              name="inClass"
//             onChange={handleChange}
//              />
//               <input
//             type="number"
//              placeholder="cell"
//              value={cell}
//              name="cell"
//             onChange={handleChange}
//              />
//               <input
//             type="text"
//              placeholder="Course"
//              value={course}
//              name="course"
//             onChange={handleChange}
//              />
//            <div className="file-field input-field">
//             <div className="btn #64b5f6 blue darken-1">
//                 <span>Uplaod Image</span>
//                 <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
//             </div>
//             <div className="file-path-wrapper">
//                 <input className="file-path validate" type="text" />
//             </div>
//             </div>
//             <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
//             onClick={()=>postDetails()}

//             >
//                 Submit post
//             </button>

//        </div>
//    )
// }


// export default AddStudent
import React, { useState } from "react";
import Loader from '../Loader'
import { post } from 'axios';
import { Form } from "react-bootstrap";
import {toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    if (!article.photo||!article.name || !article.fatherName || !article.cell || !article.inClass || !article.course || !article.rollNumber || !article.address
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
      <h1 className="text-center">New Student</h1>
      <hr />
      <div className="col-md-7 col-lg-11">
      <form onSubmit={handleSubmit}>
      <div class="row g-4">
          <div className="col-sm-6 form-group">
            <label>Name</label>
            <input name="name" type="text" value={article.name} onChange={handleChange} className="form-control" required/>
          </div>

          <div className="col-sm-6 form-group">
            <label>Roll Number</label>
            <input name="rollNumber" type="number" value={article.rollNumber} onChange={handleChange} className="form-control" required/>
          
        </div>
        
          <div className="col-sm-6 form-group">
            <label>Father Name</label>
            <input name="fatherName" type="text" value={article.fatherName} onChange={handleChange} className="form-control" required/>
          </div>
          <div className="col-sm-6 form-group">
            <label>Address</label>
            <input name="address" type="text" value={article.address} onChange={handleChange} className="form-control"required />
          </div>
       
        
          <div className="col-sm-6 form-group">
            <label>cell</label>
            <input name="cell" type="text" value={article.cell} onChange={handleChange} className="form-control" required/>
          </div>
          <div className="col-sm-6 form-group">
            <label>Course</label>
            <input name="course" type="text" value={article.course} onChange={handleChange} className="form-control" required/>
          </div>
        
        
          <div className="col-sm-6 form-group">
            <label>Class Name</label>
            <input name="inClass" value={article.inClass} onChange={handleChange} className="form-control" required/>
          </div>
         
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              name="text"
              placeholder="Enter image url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler}required />
            {loading && <Loader />}
          </Form.Group>
        </div>
        <div className="btn-group float-right">
          <input type="submit" value="Submit" className="btn btn-primary " />
        </div>
        <button type="button" onClick={handleCancel} className="btn btn-secondary mb-5">Cancel</button>
      </form>
      </div>
    </div>
  );
}

export default AddStudent;
{/* <div class="tab-content">
<div class="tab-pane active" id="home">
    <hr>
      <form class="form" action="##" method="post" id="registrationForm">
          <div class="form-group">
              
              <div class="col-xs-6">
                  <label for="first_name"><h4>First name</h4></label>
                  <input type="text" class="form-control" name="first_name" id="first_name" placeholder="first name" title="enter your first name if any.">
              </div>
          </div>
          <div class="form-group">
              
              <div class="col-xs-6">
                <label for="last_name"><h4>Last name</h4></label>
                  <input type="text" class="form-control" name="last_name" id="last_name" placeholder="last name" title="enter your last name if any.">
              </div>
          </div>

          <div class="form-group">
              
              <div class="col-xs-6">
                  <label for="phone"><h4>Phone</h4></label>
                  <input type="text" class="form-control" name="phone" id="phone" placeholder="enter phone" title="enter your phone number if any.">
              </div>
          </div>

          <div class="form-group">
              <div class="col-xs-6">
                 <label for="mobile"><h4>Mobile</h4></label>
                  <input type="text" class="form-control" name="mobile" id="mobile" placeholder="enter mobile number" title="enter your mobile number if any.">
              </div>
          </div>
          <div class="form-group">
              
              <div class="col-xs-6">
                  <label for="email"><h4>Email</h4></label>
                  <input type="email" class="form-control" name="email" id="email" placeholder="you@email.com" title="enter your email.">
              </div>
          </div>
          <div class="form-group">
              
              <div class="col-xs-6">
                  <label for="email"><h4>Location</h4></label>
                  <input type="email" class="form-control" id="location" placeholder="somewhere" title="enter a location">
              </div>
          </div>
          <div class="form-group">
              
              <div class="col-xs-6">
                  <label for="password"><h4>Password</h4></label>
                  <input type="password" class="form-control" name="password" id="password" placeholder="password" title="enter your password.">
              </div>
          </div>
          <div class="form-group">
              
              <div class="col-xs-6">
                <label for="password2"><h4>Verify</h4></label>
                  <input type="password" class="form-control" name="password2" id="password2" placeholder="password2" title="enter your password2.">
              </div>
          </div>
          <div class="form-group">
               <div class="col-xs-12">
                    <br>
                    <button class="btn btn-lg btn-success" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Save</button>
                     <button class="btn btn-lg" type="reset"><i class="glyphicon glyphicon-repeat"></i> Reset</button>
                </div>
          </div>
    </form>
  
  <hr>
  
 </div> */}