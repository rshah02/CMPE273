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
import Announcements from "../Assignments/Assignments";
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
    console.log(this.props.match.params.id);
    return (
      <div className="row">
        <div className="col-lg-1">
          <Navbar />
        </div>
        <div className="col-lg-11">
          <Header />
          <div className="row">
            <div className="col-lg-3">
              <CourseSideBar id={"5ca35b542b24eb37143aa250"} />
            </div>
            <div className="col-lg-9">
              <div className="col-lg-12 courseContents">
                <Switch>
                  <Route path="/courses/home" component={Home} />
                  <Route path="/courses/people" component={People} />
                  {/*  <Route path="/courses/Announcements" component={Announcements} /> */}
                  <Route
                    path="/course/:id/Announcements"
                    component={Announcements}
                  />
                  <Route
                    path="/courses/:id/Assignments"
                    component={Assignments}
                  />

                  <Route path="/courses/Files" component={Files} />
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
