import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Link,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'

import Signup from './components/screens/Signup'
import AddStudent from './components/screens/AddStudtent'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/Newpassword'
import SideBar from './components/DashBoard/SideBar';
import StudentList from './components/DashBoard/StudentList';
import StudentProfile from './components/DashBoard/StudentProfile';
export const UserContext = createContext()


const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
           history.push('/signin')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/" component={Home}/>
   
      <Route path="/signin"component={Signin}/>
      <Route path="/signup" component={Signup}/>
       
     
      <Route path="/addstudent" exact component={AddStudent}/>
      <Route exact path="/studentlist"component={StudentList}/>
      <Route path="/profile/:userid" component={UserProfile}/>
      <Route exact path="/student/profile/:id" component={StudentProfile}/>
      
     
      <Route exact path="/reset" component={Reset}/>
       
      <Route path="/reset/:token"component={NewPassword}/>
        
      
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <div className="container-fluid">
          <div className="row">
            {state &&  <SideBar/>}
     
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        {state &&
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="btn-group me-2">
                    <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                    <Link type="button" to='/create' className="btn btn-sm btn-outline-secondary">create</Link>
                  </div>
                  <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                    <span data-feather="calendar" />
                    This week
                  </button>
                </div>
              </div>
}
              <Routing />
              </main>
    </div>
      </div>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
