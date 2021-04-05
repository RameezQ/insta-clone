import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader';
import Subjects from './Subjects';
import ViewMark from './ViewMark';


const MarkSheet = (props) => {
    const [data, setData] = useState("")
    const [users, setUsers] = useState([])
    const { search } = window.location;
    const [studentId, setStudentId] = useState('')
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filterUsers = (users, query) => {
        if (!query) {
            return users;
        }

        return users.filter((user) => {
            const usersName = user.name.toLowerCase()
            const userphone = user.cell.toString();
            const useraddress = user.address.toLowerCase();
            const useRollNumber = user.rollNumber.toString();
            return usersName.includes(query) || userphone.includes(query) || useraddress.includes(query) || useRollNumber.includes(query);
        });
    };
    const filtereduserss = filterUsers(users, searchQuery);
    useEffect(function () {
        async function getArticles() {
            try {
                const response = await Axios.get("/students");
                setUsers(response.data);
            } catch (error) {
                console.log('error', error);
            }
        }
        getArticles();
    }, []);
    const fetchByName = (id) => {
        setStudentId(id)
        setSearchQuery(id.name)
    }
    return (

        <div className="app">
            <div className="row ml-1" >
                <div className="col-12">
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="search"
                        class="form-control"
                        placeholder="Search customer by name,address,phone"
                        name="s"
                    />
                </div>
            </div>
            <div className="row" >
                {searchQuery &&
                    <ul>
                        {filterUsers ? filtereduserss.map((user) => (
                            <li key={user._id} 
                                className="btn btn-sm-primary"
                                onClick={() => fetchByName(user)}>
                                <small>{user.name}{" "} {user.cell} {" "}{user.rollNumber}</small></li>
                        )) : <Loader />}
                    </ul>
                }
            </div>
            <div className="row " >
                <div className="col-md-6">
                    <Subjects studentId={studentId} setData={setData} data={data}/>
                </div>
                <div className="col-md-6">
                    <ViewMark studentId={studentId} data={data} />
                </div>
            </div>
        </div>



    );
};

export default MarkSheet;

// import React, {Component} from 'react';
// class MarkSheet extends Component{
//   constructor(props){
// 	super(props);
// 	this.handleFormSubmit = this.handleFormSubmit.bind(this);
// 	this.getData = this.getData.bind(this);
// 	this.state = {
// 		name_:'',
// 		standard_:''
// 	};
//   }
//   state = {
//   	name: '',
//   	standard: '',
//   	math: '',
//   	english: '',
//   	science: '',
//   	hindi: '',
//   	social: ''
//   }
//   handleChange = (event,para) => {
//     const input = event.target.value;
// 	this.setState({ [para]: input });
//    }
//    handleFormSubmit(){
//  	let fetch = JSON.parse(localStorage.getItem('state'));
//  	let array = [];
//  	if(fetch != null){
//  	  fetch.map(function (v){
//  		array.push(v);
//  	  });
//  	}
//  	array.push(this.state); 
//  	localStorage.setItem('state', JSON.stringify(array));

//    }
//    getData(){
// 	const data= JSON.parse(localStorage.getItem('state'));
// 	console.log(data);
// 	let name = this.state.name_;
// 	let standard = this.state.standard_;
// 	data.map(function(v){
//           if(name === v.name && standard === v.standard){
// 			let a = document.getElementById('name');
// 			a.value = v.name;
// 		 	let b = document.getElementById('standard');
// 			b.value = v.class;
// 		 	let c = document.getElementById('math');
// 		 	c.value = v.math;
// 			let d = document.getElementById('english');
// 			d.value = v.english;
// 		 	let e = document.getElementById('social');
// 		 	e.value = v.social;
// 		 	let f = document.getElementById('science');
// 			f.value = v.science;
// 			let g = document.getElementById('hindi');
// 			g.value = v.hindi;
// 		  }          
// 	});
//   }
//   render(){
//   	return(
// 		//   {
// 		// 	  this.state.toggle ? <component A/> : <component /b>
// 		//   }
//   	  <div className="container">
//         <hr/>
//   	    <div> 
// 	      <form>
// 		    <div className="row">
// 		      <div className="col">
// 		        <a>Add Marks</a>
// 		      </div>
// 		      <div className="col">
// 		        <a>View Marksheet</a>
// 		      </div>
// 		    </div>
// 	      </form>
//         </div>
//         <hr/>
// 		<div className='row'>
// 		<div className='col-sm-6'>
//       	<table className="table-css">
//       	  <thead>
// 		    <tr>
//       	      <th>FILL MARKSHEET</th>
//       	    </tr>
// 		  </thead>
// 		  <tbody>	
//       	    <tr>
//       	      <td><label>Name: </label></td>
//       		  <td><input type="text" onChange={(e) => this.handleChange(e, "name")} name="name" id="name" /></td>
//       	    </tr>
//       	    <tr>
//       	  	  <td><label>Standard: </label></td>
//       	  	  <td><input type="name" onChange={(e) => this.handleChange(e, "standard")} name="standard" id="standard" /></td>
//       	    </tr>
//       	    <tr>
//       	  	  <td><label>Maths: </label></td>
//       	      <td><input type="text" onChange={(e) => this.handleChange(e, "math")} name="math" id="math" /></td>
//       	    </tr>
//       	    <tr>
//       	      <td><label>English: </label></td>
//       	   	  <td><input type="text" onChange={(e) => this.handleChange(e, "english")} name="english" id="english" /></td>
//       	    </tr>
//       	    <tr>
//       	  	  <td><label>Hindi: </label></td>
//       	      <td><input type="text" onChange={(e) => this.handleChange(e, "hindi")} name="hindi" id="hindi" /></td>
//       	    </tr>
//       	    <tr>
//       	  	  <td><label>Science: </label></td>
//       	  	  <td><input type="text" onChange={(e) => this.handleChange(e, "science")} name="science" id="science" /></td>
//       	    </tr>
//       	    <tr>
//       	  	  <td><label>Social: </label></td>
//       	  	  <td><input type="text" onChange={(e) => this.handleChange(e, "social")} name="social" id="social" /></td>
//       	    </tr>
//       	    <tr>
//       	  	  <td>
//       	  	    <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>Submit</button>
//       	      </td>
//       	    </tr>
// 		  </tbody>
//         </table>
// 		<hr />
// 		</div>
// 		<div className='col-sm-6'>
// 		<table class="table-css">
//         <thead>
//           <tr>
//             <th>VIEW MARKSHEET</th>
//           </tr>
// 		  </thead>
// 		  <tbody>  
//           <tr>
//             <td><label>Name: </label></td>
//             <td><input type="text" name="" onChange={e => this.setState({name_ :e.target.value})} id="studentName" /></td>
//           </tr>
//           <tr>
//             <td><label>Class: </label></td>
//             <td><input type="number" onChange={e => this.setState({standard_ :e.target.value})}  name="" id="studentClass" /></td>
//           </tr>
//           <tr>
//             <td>
// 			  <button type="button" class="btn btn-primary" onClick={this.getData}>Submit</button>
//             </td>
//           </tr>
// 		</tbody>
//       </table>
// 	  </div>
// 	  </div>
//       </div>
//   	);
//   }
// }

// export default MarkSheet;