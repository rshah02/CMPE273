/* eslint-disable no-redeclare */
import React, { Component } from 'react';
import{BrowserRouter as Router,Route} from 'react-router-dom';

import Navbar from './components/Navbar'
import Signup from './components/Signup/SignUp'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import LandingPage from './components/landingPage'

class App extends Component {
  render() {
    return (
    
     <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={LandingPage}/>
        
         <div className="container">
           <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </div>
     </Router>
     
    );
  }
}

export default App;
