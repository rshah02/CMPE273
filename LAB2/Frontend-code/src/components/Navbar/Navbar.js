import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Navbar.css";
class Navbar extends Component {
  logOut(e) {
    //e.prventDefault()
    localStorage.removeItem("jwtToken");
    this.props.history.push("/login");
  }

  show(e) {
    document.getElementById("abc").classList.toggle("show");
  }
  render() {
    return (
      <div>
        <div className="profilecolumn hide " id="abc">
          <div className="profile-upper">
            <div className="profileImgWrapper">
              <div className="profileImg">
                <img
                  src="https://sjsu.instructure.com/images/thumbnails/52746627/2UmxWxdoeiQm1sLPurRmS4L2qqtF4yYhxpYt20sB"
                  alt="Rohankumar Shah"
                  className="rounded-circle"
                />
              </div>
            </div>
            <div className="LogoutButtonWrapper">
              <Link to="/" onClick={this.logOut.bind(this)}>
                <button className="btn btn-primary log">logout</button>
              </Link>
            </div>
          </div>
          <div className="profile-lower">
            <ul>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/courses">Settings</Link>
              </li>
              <li>
                <Link to="/courses">Files</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar ">
          <header id="navigation-bar">
            <ul className="navul">
              <div>
                <img
                  src="https://farm4.staticflickr.com/3894/14354234874_11c95cffeb_b.jpg"
                  alt="logo"
                  className="navbarlogo"
                />
              </div>
              <br />
              <li>
                <Link to="/Dashboard">
                  <i className="fas fa-tachometer-alt fa-3x" />
                  <br />
                  <span className="navbartext">Dashboard</span>
                </Link>
              </li>
              <br />
              <li>
                <i
                  className="far fa-user fa-3x"
                  onClick={this.show.bind(this)}
                />
                <br />
                <span className="navbartext">Profile</span>
              </li>
              <br />
              <li>
                <Link to="/AllCourses">
                  <i className="fa fa-book fa-3x" />
                  <br />
                  <span className="navbartext">Courses</span>
                </Link>
              </li>
              <br />
              <li>
                <Link to="/courses">
                  <i className="fas fa-envelope-open-text fa-3x" />
                  <br />
                  <span className="navbartext">Inbox</span>
                </Link>
              </li>
              <br />
              <li className="logoutbutton">
                <span>
                  <Link to="/" onClick={this.logOut.bind(this)}>
                    <i className="fas fa-power-off fa-3x" />
                    <br />
                    <span className="navbartext"> logOut</span>
                  </Link>
                </span>
              </li>
            </ul>
          </header>
        </div>
      </div>
    );
  }
}
export default withRouter(Navbar);
