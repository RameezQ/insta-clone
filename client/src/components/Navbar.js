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
     useEffect(()=>{
         M.Modal.init(searchModal.current)
     },[])
     const renderList = ()=>{
       if(state){
           return [
            // <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
            // <li key="2"><Link to="/profile">Profile</Link></li>,
            // <li key="3"><Link to="/create">Create New Product</Link></li>,
            
            <li  key="5">
             <button className="btn btn-primary"
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}
            >
                Logout
            </button>
            </li>
         
            
           ]
       }else{
         return [
          <button  key="6" className="btn" ><Link to="/signin" style={{color:"white"}}>Signin</Link></button>, 
         ]
       }
     }


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
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
          <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <input className="form-control form-control-dark w-50" type="text" placeholder="Search" aria-label="Search" />
          <ul className="navbar-nav px-3">
           
            
              <span className="nav" > {renderList()}</span>
            
          </ul>
        </header>
    )
}


export default NavBar