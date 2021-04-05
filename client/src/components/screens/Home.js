import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
const Home  = ()=>{
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

    const likePost = (id)=>{
          fetch('/like',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
                   //   console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    const unlikePost = (id)=>{
          fetch('/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            //   console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }

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
    //    <div className="home">
    //        {
    //            data.map(item=>{
    //                return(
    //                    <div className="card home-card" key={item._id}>
    //                         <h5 style={{padding:"5px"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link> {item.postedBy._id == state._id 
    //                         && <i className="material-icons" style={{
    //                             float:"right"
    //                         }} 
    //                         onClick={()=>deletePost(item._id)}
    //                         >delete</i>

    //                         }</h5>
    //                         <div className="card-image">
    //                             <img src={item.photo}/>
    //                         </div>
    //                         <div className="card-content">
    //                         <i className="material-icons" style={{color:"red"}}>favorite</i>
    //                         {item.likes.includes(state._id)
    //                         ? 
    //                          <i className="material-icons"
    //                                 onClick={()=>{unlikePost(item._id)}}
    //                           >thumb_down</i>
    //                         : 
    //                         <i className="material-icons"
    //                         onClick={()=>{likePost(item._id)}}
    //                         >thumb_up</i>
    //                         }
                            
                           
    //                             <h6>{item.likes.length} likes</h6>
    //                             <h6>{item.title}</h6>
    //                             <p>{item.body}</p>
    //                             {
    //                                 item.comments.map(record=>{
    //                                     return(
    //                                     <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
    //                                     )
    //                                 })
    //                             }
    //                             <form onSubmit={(e)=>{
    //                                 e.preventDefault()
    //                                 makeComment(e.target[0].value,item._id)
    //                             }}>
    //                               <input type="text" placeholder="add a comment" />  
    //                             </form>
                                
    //                         </div>
    //                     </div>
    <> 
      <div className="row">
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header card-header-warning card-header-icon">
              <div className="card-icon">
                <i className="material-icons">content_copy</i>
              </div>
              <p className="card-category">Used Space</p>
              <h3 className="card-title">49/50
                <small>GB</small>
              </h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons text-warning">warning</i>
                <a href="#pablo" className="warning-link">Get More Space...</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header card-header-success card-header-icon">
              <div className="card-icon">
                <i className="material-icons">store</i>
              </div>
              <p className="card-category">Revenue</p>
              <h3 className="card-title">$34,245</h3>
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