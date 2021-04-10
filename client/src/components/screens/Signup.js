import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import Loader from '../Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignIn  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
  
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = ()=>{
        setLoading(true)
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-colon")
        data.append("cloud_name","rameezqamar")
        
        fetch("https://api.cloudinary.com/v1_1/rameezqamar/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
          
           setLoading(false)
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
        })
    }
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
            //   M.toast({html: data.error,classes:"#c62828 red darken-3"})
            toast.error(data.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
           }
           else{
            //    M.toast({html:data.message,classes:"#43a047 green darken-1"})
            toast.success(data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
          
    }
    
    const PostData = (e)=>{
        e.preventDefault()
        if(image){
            setLoading(true)
            uploadPic()
        }else{
            uploadFields()
        }
       
    }

   return (
       <div>
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
      <div className="mycard " style={{marginLeft:"20%",marginTop:"-50px"}}>
         
             
               <div className="row">
             <div className="col-md-6">
                    <div className="card">
                        <div className="card-header card-header-primary " >
                            <h4 className="card-title">SignUp </h4>
                            <p className="card-category">Welcome United School Khudain khas,kasur</p>
                        </div>
                        <div className="card-body">
                            <form onSubmit={PostData} method>
                                <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Name</label>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            className="form-control"
                                            onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Email</label>
                                        <input
                                            type="text"
                                            placeholder="email"
                                            value={email}
                                            className="form-control"
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Password</label>
                                        <input
                                            type="password"
                                            placeholder="password"
                                            value={password}
                                            onChange={(e) => setPasword(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                 <div className="col-md-12">
                                        <label className="bmd-label-floating">Avatar</label>
                                        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />

                                  </div>
                                  {loading && <Loader/>}
                                  
                                </div> 
                                
                                <div>
                                    <button type="submit" className="btn btn-primary pull-right float-right">Sign up</button>
                                </div>
                                
                                   
                                    <p className="">
                                    <Link to="/signin">Already have an account ?</Link>
                                    </p>
                                   
                               
                            </form>
                        </div>
                    </div>
               </div>
              </div>
            
               </div>
               </div>
   )
}


export default SignIn