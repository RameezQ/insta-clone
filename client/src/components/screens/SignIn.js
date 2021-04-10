import React, { useState, useContext, } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignIn = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [password, setPasword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = (e) => {
e.preventDefault()
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            toast.error("invaild email", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return
        }
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
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
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({ type: "USER", payload: data.user })
                    toast.success("signin sccuessfully", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    history.push('/') 
                }
            }).catch(err => {
                console.log(err)
            })
           
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
        <div className="mycard"style={{marginLeft:"30%"}}  >

            <div className="row " >
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header card-header-primary">
                            <h4 className="card-title">Sigin </h4>
                            <p className="card-category">Welcome United School Khudain khas,kasur</p>
                        </div>
                        <div className="card-body">
                            <form onSubmit={PostData} method>
                                <div className="row">
                                <div className="col-md-10">
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
                                <div className="col-md-10">
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
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary pull-right float-right">Sign in</button>
                                </div>
                                
                                   
                                    <p className="">
                                        <Link to="/signup">Dont have an account ?</Link>
                                    </p>
                                    <p className="">
                                        <Link to="/reset">Forgot password ?</Link>
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