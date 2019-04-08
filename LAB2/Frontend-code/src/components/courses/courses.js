import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "../../App.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import CourseSideBar from "../CourseSideBar/CourseSideBar";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import People from "../People/People";
import Assignments from "../Assignments/Assignments";
import Announcements from "../Announcements/Announcements";
import NewAssignment from "../NewAssignment/NewAssignment";
import submit from "../submit/submit";
import Files from "../Files/Files";
class courses extends Component {
  constructor(props) {
    super(props);
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
    console.log("in course:" + this.props.match.params.Id);
    return (
      <div className="row">
        <div className="col-md-1">
          <Navbar />
        </div>
        <div className="col-md-11">
          <Header />
          <div className="row">
            <div className="col-md-2">
              <CourseSideBar id={this.props.match.params.Id} />
            </div>
            <div className="col-md-10">
              <div className="col-md-12 courseContents">
                <Switch>
                  <Route path="/courses/home" component={Home} />
                  <Route path="/courses/people" component={People} />
                  {/*  <Route path="/courses/Announcements" component={Announcements} /> */}
                  <Route
                    path="/courses/:id/Announcements"
                    component={Announcements}
                  />
                  <Route
                    path="/courses/:id/Assignments"
                    component={Assignments}
                  />
                  <Route
                    path="/courses/:id/NewAssignment"
                    component={NewAssignment}
                  />
                  <Route
                    path="/courses/:id/Assignments/:cid"
                    component={submit}
                  />
                  <Route path="/courses/:id/Files" component={Files} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(courses);

const Home = props => <div>Home</div>;
