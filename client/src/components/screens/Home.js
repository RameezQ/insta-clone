import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import Loader from '../Loader'
import axios from 'axios'
const Home  = ()=>{
    const [data,setData] = useState([])
    const [fees, setFee] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(function () {
      async function getArticles() {
          try {
              const response = await axios.get("/students");
              setData(response.data);
  
          } catch (error) {
              console.log('error', error);
          }
      }
      getArticles();
  }, []);

   
 
    const fee =data.map(p=>p.fee.reduce((a,c)=>a+c.paid,0))
const notPaid=data.map(p=>p.fee.map(p=>p.status))
// const unPaid=notPaid.map(p=>p==false)
console.log(notPaid==false.length)
   return (
   <>
  
      <div className="row">
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header card-header-warning card-header-icon">
              <div className="card-icon">
                <i className="material-icons">groups</i>
              </div>
              <p className="card-category">Students</p>
              <h3 className="card-title"> {"  "}
                <small>{data?data.length:""}</small>
              </h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons text-warning">warning</i>
                <Link href="#pablo" className="warning-link">Register New Students</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header card-header-success card-header-icon">
              <div className="card-icon">
                <i className="material-icons">account_balance</i>
              </div>
              <p className="card-category">Revenue</p>
              <h3 className="card-title">Rs {" "}{fee}</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons">date_range</i> Last 24 Hours
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header card-header-danger card-header-icon">
              <div className="card-icon">
                <i className="material-icons">info_outline</i>
              </div>
              <p className="card-category">Fixed Issues</p>
              <h3 className="card-title">75</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons">local_offer</i> Tracked from Github
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header card-header-info card-header-icon">
              <div className="card-icon">
                <i className="fa fa-twitter" />
              </div>
              <p className="card-category">Followers</p>
              <h3 className="card-title">+245</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons">update</i> Just Updated
              </div>
            </div>
          </div>
        </div>
      </div>
         </>
               
          
          
       )
}


export default Home