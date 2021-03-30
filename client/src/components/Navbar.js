import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'
const NavBar = ()=>{
    const  searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
     const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
    

     const fetchUsers = (query)=>{
        setSearch(query)
        fetch('/search-users',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=>{
          setUserDetails(results.user)
        })
     }
    return(
      <nav className="navbar header-navbar pcoded-header">
              <div className="navbar-wrapper">
                <div className="navbar-logo">
                  <Link className="mobile-menu" id="mobile-collapse" to="#!">
                    <i className="ti-menu" />
                  </Link>
                  <Link className="mobile-search morphsearch-search" to="#">
                    <i className="ti-search" />
                  </Link>
                  <Link to="index.html">
                    {/* <img className="img-fluid" src="assets/images/logo.png" alt="Theme-Logo" /> */}
                  </Link>
                  <Link to="" className="mobile-options">
                    <i className="ti-more" />
                  </Link>
                </div>
                <div className="navbar-container container-fluid">
                  <ul className="nav-left">
                    <li>
                      <div className="sidebar_toggle"><Link to="/" onClick={(e)=>e.preventDefault()}><i className="ti-menu" /></Link></div>
                    </li>
                    <li>
                      <Link to="#!" onClick="javascript:toggleFullScreen()">
                        <i className="ti-fullscreen" />
                      </Link>
                    </li>
                  </ul>
                  <ul className="nav-right">
                    <li className="header-notification">
                      <Link to="#!">
                        <i className="ti-bell" />
                        <span className="badge bg-c-pink" />
                      </Link>
                      <ul className="show-notification">
                        <li>
                          <h6>Notifications</h6>
                          <label className="label label-danger">New</label>
                        </li>
                        <li>
                          
                          <div className="media">
                            <img className="d-flex align-self-center img-radius" src="assets/images/avatar-4.jpg" alt="Generic placeholder image" />
                            <div className="media-body">
                              <h5 className="notification-user">John Doe</h5>
                              <p className="notification-msg">Lorem ipsum dolor sit amet, consectetuer elit.</p>
                              <span className="notification-time">30 minutes ago</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="media">
                            <img className="d-flex align-self-center img-radius" src="assets/images/avatar-3.jpg" alt="Generic placeholder image" />
                            <div className="media-body">
                              <h5 className="notification-user">Joseph William</h5>
                              <p className="notification-msg">Lorem ipsum dolor sit amet, consectetuer elit.</p>
                              <span className="notification-time">30 minutes ago</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="media">
                            <img className="d-flex align-self-center img-radius" src="assets/images/avatar-4.jpg" alt="Generic placeholder image" />
                            <div className="media-body">
                              <h5 className="notification-user">Sara Soudein</h5>
                              <p className="notification-msg">Lorem ipsum dolor sit amet, consectetuer elit.</p>
                              <span className="notification-time">30 minutes ago</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>

                    <li className="user-profile header-notification">
                      {state?
                      <Link to="#!">
                        {/* <img src="assets/images/avatar-4.jpg" className="img-radius" alt="User-Profile-Image" /> */}
                        <span>{state.name}</span>
                        <i className="ti-angle-down" />
                      </Link>:""}
                      <ul className="show-notification profile-notification">
                        <li>
                          <Link to="#!">
                            <i className="ti-settings" /> Settings
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="ti-user" /> Profile
                          </Link>
                        </li>
                        {/* <li>
                          <Link to="#">
                            <i className="ti-email" /> My Messages
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="ti-lock" /> Lock Screen
                          </Link>
                        </li> */}
                        <li>
                          <button 
                           onClick={()=>{
                            localStorage.clear()
                            dispatch({type:"CLEAR"})
                            history.push('/signin')
                          }}
                          >
                            <i className="ti-layout-sidebar-left" 
                            
                            /> Logout
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
      //   <nav>
      //   <div className="nav-wrapper white">
      //     <Link to={state?"/":"/signin"} className="brand-logo left">SanPak</Link>
      //     <ul id="nav-mobile" className="right">
      //        {renderList()}
  
      //     </ul>
      //   </div>
      //   <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
      //     <div className="modal-content">
      //     <input
      //       type="text"
      //       placeholder="search users"
      //       value={search}
      //       onChange={(e)=>fetchUsers(e.target.value)}
      //       />
      //        <ul className="collection">
      //          {userDetails.map(item=>{
      //            return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
      //              M.Modal.getInstance(searchModal.current).close()
      //              setSearch('')
      //            }}><li className="collection-item">{item.email}</li></Link> 
      //          })}
               
      //         </ul>
      //     </div>
      //     <div className="modal-footer">
      //       <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
      //     </div>
      //   </div>
      // </nav>
    )
}


export default NavBar