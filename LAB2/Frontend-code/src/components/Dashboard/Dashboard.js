import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Coursecard from "../Coursecard/Coursecard";
import "../../App.css";
import "./Dashboard.css";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import createAbsoluteGrid from "react-absolute-grid";

import newCourse from "../newCourse/newCourse";

function Card({ item }) {
  console.log(item.key);
  return (
    // put your course card data here

    <Coursecard
      key={item.key}
      num={item.key}
      id={item._id}
      dept={item.courseDept}
      name={item.courseName}
      term={item.courseTerm}
      draggable={true}
    />
  );
}
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: ""
    };
  }
  //Dummy componenet did mount
  componentDidMount() {
    const Token = localStorage.getItem("jwtToken");
    console.log(Token);
    axios
      .get("http://localhost:3001/users/courses", {
        headers: { Authorization: Token }
      })
      .then(response => {
        let courses = response.data;
        console.log(response.data);
        courses = courses.map((course, i) => {
          return {
            ...course,
            key: i,
            sort: i
          };
        });
        this.setState({ courses });
      });
  }
  onMove = (from, to) => {
    let courses = this.state.courses;
    let temp = courses[from].sort;
    courses[from].sort = courses[to].sort;
    courses[to].sort = temp;
    // console.log(from, to)
    this.setState({ courses });
  };
  //dummy finish

  render() {
    let courses = [];
    Object.assign(courses, this.state.courses);

    const AbsoluteGrid = createAbsoluteGrid(Card, {}, true);

    const isStudent = this.props.loginStateStore.user.type === "Student";
    console.log(this.props.loginStateStore.user.type);
    console.log(isStudent);
    return (
      <div>
        <Navbar />
        <Header />

        <div className="pageContent">
          {isStudent ? (
            <Link to="/course/search">
              <button className="btn btn-primary as-btn">Search Course</button>{" "}
            </Link>
          ) : (
            <Link to="/Dashboard/newCourse">
              <button className="btn btn-primary as-btn"> + Add Course</button>
            </Link>
          )}
        </div>
        <hr />

        <div>
          <Switch>
            <Route path="/Dashboard/newCourse" component={newCourse} />
          </Switch>
        </div>
        <AbsoluteGrid
          items={courses}
          dragEnabled
          onMove={this.onMove}
          responsive
          itemHeight={330}
          itemWidth={360}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginStateStore: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(Dashboard));
