/* eslint-disable no-redeclare */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Signup from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Courses from "./components/Courses/Courses";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import Dashboard from "./components/Dashboard/Dashboard";

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
              <Route exact path="/profile" component={Profile} />
              <Route path="/courses" component={Courses} />
              <Route path="/courses/:id/home" component={Courses} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
