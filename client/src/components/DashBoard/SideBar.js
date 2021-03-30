import React from 'react'
import { useContext } from 'react'
import {Link ,useHistory} from 'react-router-dom'
import { UserContext } from '../../App'

const SideBar = () => {
    const history =useHistory()
    const {state,dispatch} = useContext(UserContext)
    return (
        <nav className="pcoded-navbar">
        <div className="sidebar_toggle"><Link to="#"><i className="icon-close icons" /></Link></div>
        <div className="pcoded-inner-navbar main-menu">
          <div className>
            <div className="main-menu-header">
              {/* <img className="img-40 img-radius" src="assets/images/avatar-4.jpg" alt="User-Profile-Image" /> */}
              <div className="user-details">
                <span>{state?state.name:""}</span>
                <span id="more-details"><i className="ti-angle-down" /></span>
              </div>
            </div>
            <div className="main-menu-content">
              <ul>
                <li className="more-details">
                  <Link to="#"><i className="ti-user" />View Profile</Link>
                  <Link to="#!"><i className="ti-settings" />Settings</Link>
                  <button  onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/signin')
                  }}><i className="ti-layout-sidebar-left"  
                  
                  />Logout</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="pcoded-search">
            <span className="searchbar-toggle"></span>
            <div className="pcoded-search-box ">
              <input type="text" placeholder="Search" />
              <span className="search-icon"><i className="ti-search" aria-hidden="true" /></span>
            </div>
          </div>
          <div className="pcoded-navigatio-lavel" data-i18n="nav.category.navigation">Layout</div>
          <ul className="pcoded-item pcoded-left-item">
            <li className="active">
              <Link to="index.html">
                <span className="pcoded-micon"><i className="ti-home" /><b>D</b></span>
                <span className="pcoded-mtext" data-i18n="nav.dash.main">Dashboard</span>
               
              </Link>
            </li>
            <li className="pcoded-hasmenu">
              <Link to='/' onClick={(e)=>e.preventDefault()} >
                <span className="pcoded-micon"><i className="ti-layout-grid2-alt" /></span>
                <span className="pcoded-mtext" data-i18n="nav.basic-components.main">Students</span>
               
              </Link>
              <ul className="pcoded-submenu">
                <li className=" ">
                  <Link to="/create">
                    <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                    <span className="pcoded-mtext" data-i18n="nav.basic-components.alert">New Admission </span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/studentlist">
                    <span className="pcoded-micon"><i className="ti-angle-right" /></span>
                    <span className="pcoded-mtext" data-i18n="nav.basic-components.breadcrumbs">Student List</span>
                   
                  </Link>
                </li>
               
                
              </ul>
            </li>
          </ul>
         
          
         
         
        </div>
        </nav>
           
       
        
    )
}

export default SideBar
