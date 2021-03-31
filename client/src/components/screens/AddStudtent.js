import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import '../../App.css'
import {useHistory} from 'react-router-dom'

const AddStudent = ()=>{
    const history = useHistory()
    const [name,setName] = useState("rameez")
    const [fatherName,setFatherName] = useState("aamar")
    const [address, setAddress] = useState('cha')
    const [cell, setCell] = useState('03064027046')
    const [inClass, setInClass] = useState('9th')
    const [course, setCourse] = useState('pre-medicl')
    const [rollNumber, setRollNumber] = useState('12cd')
    const [image,setImage] = useState("")

    const [url,setUrl] = useState("")
    useEffect(()=>{
       if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                name,
                fatherName,
                pic:url,
                cell,
                address,
                inClass,
                course,
                rollNumber
            })
        }).then(res=>res.json())
        .then(data=>{
    
           if(data.error){
            
               M.toast({html: data.error,classes:"#c62828 red darken-3"}) 
           }
           else{
               M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
               history.push('/studentlist')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])
  
   const postDetails = ()=>{
       const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","sanpak")
       data.append("cloud_name","rameezqamar")
       fetch("https://api.cloudinary.com/v1_1/rameezqamar/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
          setUrl(data.url)
       })
       .catch(err=>{
           console.log(err)
       })

    
   }
 

   return(
       <div className="card input-filed"
       style={{
           margin:"30px auto",
           maxWidth:"500px",
           padding:"20px",
           textAlign:"center"
       }}
       >
             <input 
           type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e)=>setRollNumber(e.target.value)}
            />
           <input 
           type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />

           <input
            type="text"
             placeholder="fatherName"
             value={fatherName}
            onChange={(e)=>setFatherName(e.target.value)}
             />
              <input
            type="text"
             placeholder="address"
             value={address}
            onChange={(e)=>setAddress(e.target.value)}
             />
              <input
            type="text"
             placeholder="Class Name"
             value={inClass}
            onChange={(e)=>setInClass(e.target.value)}
             />
              <input
            type="number"
             placeholder="cell"
             value={cell}
            onChange={(e)=>setCell(e.target.value)}
             />
              <input
            type="text"
             placeholder="Course"
             value={course}
            onChange={(e)=>setCourse(e.target.value)}
             />
           <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Uplaod Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postDetails()}
            
            >
                Submit post
            </button>

       </div>
   )
}


export default AddStudent