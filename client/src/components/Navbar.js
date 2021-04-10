import React, { useContext, useRef, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'
import { Dropdown, DropdownButton } from 'react-bootstrap'
const NavBar = () => {
  const searchModal = useRef(null)
  const [search, setSearch] = useState('')
  const [userDetails, setUserDetails] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const history = useHistory()
  useEffect(() => {
    M.Modal.init(searchModal.current)
  }, [])
  const renderList = () => {
    if (state) {
      return [
        // <li key="1"><i  data-target="modal1" classNameName="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
        // <li key="2"><Link to="/profile">Profile</Link></li>,
        // <li key="3"><Link to="/create">Create New Product</Link></li>,

        <li key="5">
          <button classNameName="btn btn-primary"
            onClick={() => {
              localStorage.clear()
              dispatch({ type: "CLEAR" })
              history.push('/signin')
            }}
          >
            Logout
            </button>
        </li>


      ]
    } else {
      return [
        <Link to="/signin" style={{ color: "white" }}>Signin</Link>
      ]
    }
  }


  const fetchUsers = (query) => {
    setSearch(query)
    fetch('/search-users', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    }).then(res => res.json())
      .then(results => {
        setUserDetails(results.user)
      })
  }
  return (
    // <nav classNameName="navbar shadow navbar-expand-lg navbar-transparent navbar-absolute fixed-top " id="navigation-example">
    //   <div classNameName="container-fluid">
    //     <div classNameName="navbar-wrapper">
    //       <Link classNameName="navbar-brand" to="/">{state ? state.name : "DashBoard"}</Link>
    //     </div>
    //     <button classNameName="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation" data-target="#navigation-example">
    //       <span classNameName="sr-only">Toggle navigation</span>
    //       <span classNameName="navbar-toggler-icon icon-bar" />
    //       <span classNameName="navbar-toggler-icon icon-bar" />
    //       <span classNameName="navbar-toggler-icon icon-bar" />
    //     </button>
    //     <div classNameName="collapse navbar-collapse justify-content-end">
    //       {/* <form classNameName="navbar-form">
    //         <div classNameName="input-group no-border">
    //           <input type="text" defaultValue classNameName="form-control" placeholder="Search..." />
    //           <button type="submit" classNameName="btn btn-default btn-round btn-just-icon">
    //             <i classNameName="material-icons">search</i>
    //             <div classNameName="ripple-container" />
    //           </button>
    //         </div>
    //       </form> */}
    //       <ul classNameName="navbar-nav">
    //         <li classNameName="nav-item">
    //           <Link classNameName="nav-link" to="javascript:void(0)">
    //             <i classNameName="material-icons">dashboard</i>
    //             <p classNameName="d-lg-none d-md-block">
    //               Stats
    //             </p>
    //           </Link>
    //         </li>
    //         <li classNameName="nav-item dropdown">
    //           <Link classNameName="nav-link" to='' id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //             <i classNameName="material-icons">notifications</i>
    //             <span classNameName="notification">5</span>
    //             <p classNameName="d-lg-none d-md-block">
    //               Some Actions
    //             </p>
    //           </Link>
    //           <div classNameName="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
    //             <Link classNameName="dropdown-item" to="javascript:void(0)">Mike John responded to your email</Link>
    //             <Link classNameName="dropdown-item" to="javascript:void(0)">You have 5 new tasks</Link>
    //             <Link classNameName="dropdown-item" to="javascript:void(0)">You're now friend with Andrew</Link>
    //             <Link classNameName="dropdown-item" to="javascript:void(0)">Another Notification</Link>
    //             <Link classNameName="dropdown-item" to="javascript:void(0)">Another One</Link>
    //           </div>
    //         </li>
    //         <li classNameName="nav-item">
    //           <span classNameName="nav-link" >

    //             {state ?
    //               <button onClick={() => {
    //                 localStorage.clear()
    //                 dispatch({ type: "CLEAR" })
    //                 history.push('/signin')
    //               }} classNameName="btn btn-primary">Logout</button>
    //               : <Link to="/login" classNameName="btn btn-primary">Login</Link>}
    //           </span>
    //         </li>

    //       </ul>
    //     </div>
    //   </div>
    // </nav>
    <nav className="navbar shadow navbar-expand-lg navbar-transparent navbar-absolute fixed-top " id="navigation-example">
    <div className="container-fluid">
      <div className="navbar-wrapper">
        <a className="navbar-brand" href="javascript:void(0)">{state ? state.name : "DashBoard"}</a>
      </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation" data-target="#navigation-example">
        <span className="sr-only">Toggle navigation</span>
        <span className="navbar-toggler-icon icon-bar"></span>
        <span className="navbar-toggler-icon icon-bar"></span>
        <span className="navbar-toggler-icon icon-bar"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end">
        <form className="navbar-form">
          {/* <div className="input-group no-border">
            <input type="text" value="" className="form-control" placeholder="Search..."/>
            <button type="submit" className="btn btn-default btn-round btn-just-icon">
              <i className="material-icons">search</i>
              <div className="ripple-container"></div>
            </button>
          </div> */}
        </form>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={(e)=>e.preventDefault()}>
            
              {state ?
                  <button onClick={() => {
                    localStorage.clear()
                    dispatch({ type: "CLEAR" })
                    history.push('/signin')
                  }} className="btn btn-primary">Logout</button>
                  : <Link to="/login" className="btn btn-primary">Login</Link>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  )
}


export default NavBar