import React, { useState, useContext, } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'
const SignIn = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [password, setPasword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })
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
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({ type: "USER", payload: data.user })
                    M.toast({ html: "signedin success", classes: "#43a047 green darken-1" })
                    history.push('/')
                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <section className="login p-fixed d-flex text-center bg-primary common-img-bg">

            <div className="container">
                <div className="row">
                    <div className="col-sm-12">

                        <div className="login-card card-block auth-body mr-auto ml-auto">
                            <form className="md-float-material">
                                <div className="text-center">
                                    <img src="assets/images/auth/logo-dark.png" alt="logo.png" />
                                </div>
                                <div className="auth-box">
                                    <div className="row m-b-20">
                                        <div className="col-md-12">
                                            <h3 className="text-left txt-primary">Sign In</h3>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="input-group">
                                        <input type="email" className="form-control" placeholder="Your Email Address" value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                        <span className="md-line"></span>
                                    </div>
                                    <div className="input-group">
                                        <input type="password" className="form-control" placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPasword(e.target.value)}
                                        />
                                        <span className="md-line"></span>
                                    </div>
                                    <div className="row m-t-25 text-left">

                                        <div className="col-sm-8 col-xs-12 forgot-phone text-right">
                                            <Link to="/reset" className="text-right f-w-600 text-inverse"
                                                to="/reset"
                                            > Forgot Your Password?</Link>
                                        </div>
                                    </div>
                                    <div className="row m-t-30">
                                        <div className="col-md-12">
                                            <button type="button" className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20" onClick={() => PostData()}>Sign in</button>
                                        </div>
                                        <h5>
                                            <Link to="/signup">Dont have an account ?</Link>
                                        </h5>
                                    </div>



                                </div>
                            </form>

                        </div>

                    </div>
                </div>

            </div>

        </section>)
}


export default SignIn