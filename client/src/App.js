import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'

import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/Newpassword'
import SideBar from './components/DashBoard/SideBar';
import Main from './components/DashBoard/Main';
import StudentList from './components/StudentList';
import StudentTab from './components/StudentTab';
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
      <Route exact path="/" component={Main}>
     
      </Route>
      <Route path="/signin" exact component={Signin}>
       
      </Route>
      <Route path="/studentlist"exact component={StudentList}/>
       
      
      <Route path="/signup" exact component={Signup}>
      
      </Route>
      
      <Route path="/student/:id" exact component={StudentTab}/>
        
  
      <Route path="/create" component={CreatePost}>
     
      </Route>
      <Route path="/profile/:userid" component={UserProfile}>
     
      </Route>
     
      <Route exact path="/reset" component={Reset}>
 
      </Route>
      <Route path="/reset/:token" exact component={NewPassword}>
      </Route>
      
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <div id="pcoded" className="pcoded">
          <div className="pcoded-overlay-box" />
          <div className="pcoded-container navbar-wrapper">
          <NavBar />
            <div className="pcoded-main-container">
              <div className="pcoded-wrapper">
                {state?
                  <SideBar />
                :""}
                  <div className="pcoded-content">
                 <div className="pcoded-inner-content">
      <Routing />
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
