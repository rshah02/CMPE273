/* eslint-disable no-redeclare */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Signup from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Courses from "./components/Courses/Courses";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import AllCourses from "./components/AllCourses";
import Announcements from "./components/Announcements/Announcements";
import newAnnouncement from "./components/NewAnnouncement/NewAnnouncement";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {/*<Route exact path="/" component={LandingPage}/> */}
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route path="/Dashboard" component={Dashboard} />
              <Route path="/AllCourses" component={AllCourses} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/courses/:Id" component={Courses} />
              <Route
                path="/courses/:Id/Announcements"
                component={Announcements}
              />
              <Route
                path="/courses/:Id/newAnnouncement"
                component={newAnnouncement}
              />
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
