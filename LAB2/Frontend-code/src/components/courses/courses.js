import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "../../App.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import CourseSideBar from "../CourseSideBar/CourseSideBar";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import People from "../People/People";
class courses extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      books: []
    };
  }
  //get the books data from backend
  componentDidMount() {
    axios
      .get("http://localhost:3001/users/courses", { params: { userId: "346" } })
      .then(response => {
        //update the state with the response data
        this.setState({
          books: [...this.state.books, ...response.data]
        });
      });
  }

  render() {
    //iterate over books to create a table row
    let details = this.state.books.map(book => {
      return (
        <tr>
          <td>{book.courseDept}</td>
          <td>{book.courseId}</td>
          <td>{book.courseName}</td>
          <td>{book.courseDescription}</td>
        </tr>
      );
    });
    //if not logged in go to login page
    /*  let redirectVar = null;
          if (!cookie.load('cookie')) {
              redirectVar = <Redirect to="/login" />
          } */
    return (
      <div className="row">
        <div className="col-lg-1">
          <Navbar />
        </div>
        <div className="col-lg-11">
          <Header />
          <div className="row">
            <div className="col-lg-3">
              <CourseSideBar />
            </div>
            <div class="col-lg-9">
              {/*<Route exact path="/" component={LandingPage}/> */}
              <div class="col-lg-12">
                <Route path="/people" component={People} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export Home Component
export default withRouter(courses);
