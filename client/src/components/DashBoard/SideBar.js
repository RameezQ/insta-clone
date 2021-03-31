import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
const SideBar = () => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/studentlist">
                <span data-feather="home" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/teacher">
                <span data-feather="file" />
                Teachers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/studentlist">
                <span data-feather="shopping-cart" />
                Students
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <span data-feather="users" />
                Classes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <span data-feather="bar-chart-2" />
                course
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <span data-feather="layers" />
                Integrations
              </Link>
            </li>
          </ul>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            <Link className="link-secondary" to="#" aria-label="Add a new report">
              <span data-feather="plus-circle" />
            </Link>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <span data-feather="file-text" />
                Current month
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <span data-feather="file-text" />
                Last quarter
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <span data-feather="file-text" />
                Social engagement
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <span data-feather="file-text" />
                Year-end sale
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
}

export default SideBar
