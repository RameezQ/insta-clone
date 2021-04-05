import React, { useEffect, createContext, useReducer, useContext } from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'

import Signup from './components/screens/Signup'
import AddStudent from './components/DashBoard/AddStudtent'
import { reducer, initialState } from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/Newpassword';
import SideBar from './components/DashBoard/SideBar';
import StudentList from './components/DashBoard/StudentList';
import StudentProfile from './components/DashBoard/StudentProfile'
import TeacherList from './components/DashBoard/TeacherList';
import Teacher from './components/DashBoard/Teacher';
import TeacherProfile from './components/DashBoard/TeacherProfile';
import MarkSheet from './components/DashBoard/MarkSheet';

export const UserContext = createContext()


const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
    } else {
      if (!history.location.pathname.startsWith('/reset'))
        history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path='/addteacher' exact component={Teacher} />
      <Route path='/teacherlist' exact component={TeacherList} />
      <Route path="/addstudent" exact component={AddStudent} />
      <Route exact path="/studentlist" component={StudentList} />
      <Route path="/profile/:userid" component={UserProfile} />
      <Route exact path="/student/profile/:id" component={StudentProfile} />
      <Route exact path="/teacher/profile/:id" component={TeacherProfile} />
      <Route exact path="/marksheet" component={MarkSheet} />
      <Route exact path="/reset" component={Reset} />
      <Route path="/reset/:token" component={NewPassword} />
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>

        <div className="dark">
          <div className="wrapper">
            {state && <SideBar />}
            <div className="main-panel">
              {state && <NavBar />}
              <div className="content">
                <div className="container-fluid">
                  <Routing />
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
