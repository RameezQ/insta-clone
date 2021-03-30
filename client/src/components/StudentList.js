
import React,{useState,useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import {UserContext} from '../App'

const StudentList = () => {
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
       fetch('/allpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.posts)
       })
    },[])
    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
    return (  
                    <div className="main-body">
                      <div className="page-wrapper">
                        <div className="page-body">
                          <div className="card">
                            <div className="card-header">
                              <h5>Hover table</h5>  
                              <div className="card-header-right"> <Link to="/create" className="btn btn-primary">New Admission</Link>    </div>
                            </div>
                            <div className="card-block table-border-style">
                              <div className="table-responsive">
                                <table className="table ">
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>full Name</th>
                                      <th>Cell Number</th>
                                      <th>Address</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                 
                                  <tbody>
                                  {data.map((list,i)=>
                                    <tr>
                                      <th scope="row">{i}</th>
                                      <td><Link to={`/student/${list._id}`}>{list.name} {""} {list.fatherName}</Link></td>
                                      <td>{list.cell}</td>
                                      <td>{list.address}</td>
                                      <td ><sapn onClick={()=>deletePost(list._id)} className="btn"><i className="ti-trash danger"></i></sapn></td>
                                    </tr>
                                    )}
                                   
                                  </tbody>
                                 
                                </table>
                              </div>
                            </div>
                          </div>
                         
                        </div>
                      
                      </div>
                    </div>
                   
                
              
            
          
       
      
    )
}

export default StudentList
