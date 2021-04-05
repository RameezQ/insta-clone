import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
const SideBar = () => {
    return (
      <div className="sidebar" data-color="purple" data-background-color="" data-image="">
      {/*
      Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

      Tip 2: you can also add an image using data-image tag
  */}
      <div className="logo"><Link to="/" className="simple-text logo-normal">
          RQ Developer
        </Link></div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          <li className="nav-item active  ">
            <Link className="nav-link" to="/">
              <i className="material-icons">dashboard</i>
              <p>Dashboard</p>
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="/teacherlist">
              <i className="material-icons">Teachers</i>
              <p>Teachers</p>
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="/studentlist">
              <i className="material-icons">content_paste</i>
              <p>Students</p>
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="./marksheet">
              <i className="material-icons">library_books</i>
              <p>Marks Sheet</p>
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="./icons.html">
              <i className="material-icons">bubble_chart</i>
              <p>Icons</p>
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="./map.html">
              <i className="material-icons">location_ons</i>
              <p>Maps</p>
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="./notifications.html">
              <i className="material-icons">notifications</i>
              <p>Notifications</p>
            </Link>
          </li>
          {/* <li class="nav-item active-pro ">
              <Link class="nav-link" to="./upgrade.html">
                  <i class="material-icons">unarchive</i>
                  <p>Upgrade to PRO</p>
              </Link>
          </li> */}
        </ul>
      </div>
    </div>
    )
}

export default SideBar
