import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./CourseSidebar.css";
class CourseSideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("sidebarprops:" + this.props.id);
    return (
      <div className="courseSideBar">
        <div className="coursesidebarInner">
          <ul>
            <li className="rounded">
              <Link to="/courses/home">Home</Link>
            </li>
            <li className="rounded">
              <Link to="/courses/Announcements">Announcements</Link>
            </li>
            <li className="rounded">
              <Link to={`/courses/${this.props.id}/Assignments`}>
                Assignments
              </Link>
            </li>
            <li className="rounded">
              <Link to="/Home">Discussions</Link>
            </li>
            <li className="rounded">
              <Link to="/Home">Grades</Link>
            </li>
            <li className="rounded">
              <Link to="/courses/people">People</Link>
            </li>
            <li className="rounded">
              <Link to="/courses/Files">Files</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(CourseSideBar);
