import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const SignIn  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","new-insta")
        data.append("cloud_name","cnq")
        fetch("https://api.cloudinary.com/v1_1/cnq/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
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
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
       
    }

   return (
    <section className="login p-fixed d-flex text-center bg-primary common-img-bg">

    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-12">

                <div className="signup-card card-block auth-body mr-auto ml-auto">
                    <form className="md-float-material">
                        <div className="text-center">
                            <img src="assets/images/auth/logo-dark.png" alt="logo.png" />
                        </div>
                        <div className="auth-box">
                            <div className="row m-b-20">
                                <div className="col-md-12">
                                    <h3 className="text-center txt-primary">Sign up. It is fast and easy.</h3>
                                </div>
                            </div>
                            <hr />
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Choose Username" value={name}
                                    onChange={(e) => setName(e.target.value)} />
                                <span className="md-line"></span>
                            </div>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Your Email Address" value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                                <span className="md-line"></span>
                            </div>
                            <div className="input-group">
                                <input type="password" className="form-control" placeholder="Choose Password" value={password}
                                    onChange={(e) => setPasword(e.target.value)} />
                                <span className="md-line"></span>

                            </div>

                            <div className="row m-t-25 text-left">

                                <div className="col-md-12">
                                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                                    <span className="cr"><i className="cr-icon icofont icofont-ui-check txt-primary"></i></span>
                                    {/* <input className="file-path validate" type="text" /> */}
                                </div>
                            </div>
                            <div className="row m-t-30">
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20"
                                        onClick={() => PostData()}
                                    >Sign up now.</button>
                                </div>
                                <h5>
                                    <Link to="/signin">Already have an account ?</Link>
                                </h5>
                            </div>


                        </div>
                    </form>

                </div>

            </div>

        </div>
    </div>

</section>
   )
}


export default SignIn