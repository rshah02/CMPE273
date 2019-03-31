import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { getProfile } from "../../actions/profileAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Profile.css";
import { Link, withRouter } from "react-router-dom";
import Navbar from "./../../components/Navbar/Navbar";
import axios from "axios";
import "../../App.css";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userData: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      name: this.state.userData.name,
      email: this.state.userData.email,
      avatar: this.state.userData.avatar,
      type: this.state.userData.type,
      city: this.state.userData.city,
      phone: this.state.userData.phone,
      country: this.state.userData.country,
      school: this.state.userData.school,
      company: this.state.userData.company,
      languages: this.state.userData.languages,
      homeTown: this.state.userData.homeTown
    };
    axios.post("http://localhost:3001/users/profile", user).then(res => {
      console.log(res.data);
      this.setState({
        userData: res.data
      });
    });

    //this.props.updateProfile(user);
    /* profile(user).then(res => {
      this.props.history.push(`/profile`);
    });*/
  }

  componentDidMount() {
    //this.props.getProfile();
    let token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    console.log(decoded);
    axios
      .get("http://localhost:3001/users/profile", {
        params: { email: decoded.email }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          userData: response.data
        });
      });
  }
  logOut(e) {
    //e.prventDefault()
    localStorage.removeItem("jwtToken");
    this.props.history.push("/login");
  }
  render() {
    return (
      <div>
        <Navbar />

        <div className="container">
          <div className="row">
            {/*    <div className="profilecolumn hide " id="abc">
              <div className="profile-upper">
                <div className="profileImgWrapper">
                  <div className="profileImg">
                    <img
                      src="//www.gravatar.com/avatar/bc5a9a84383c25328d70edc83fc54ac7?s=100&r=pg&d=mm"
                      className="rounded-circle"
                    />
                  </div>
                </div>
                <div className="LogoutButtonWrapper">
                  <Link to="/" onClick={this.logOut.bind(this)}>
                    <button className="btn">logout</button>
                  </Link>
                </div>
              </div>
              <div className="profile-lower">
                <ul>
                  <li>
                    <Link to="/courses">Profile</Link>
                  </li>
                  <li>
                    <Link to="/courses">Settings</Link>
                  </li>
                  <li>
                    <Link to="/courses">Files</Link>
                  </li>
                </ul>
              </div>
    </div> */}
            <div className="col-lg-3" />
            <div className="col-lg-6">
              <h4>Profile</h4>
              <br />

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <img
                    className="rounded-circle"
                    src={this.state.userData.avatar}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label for="name">Name: </label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      name="name"
                      placeholder="name"
                      className="form-control"
                      value={this.state.userData.name}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    {" "}
                    <label for="Phone">Phone: </label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      className="form-control"
                      type="text"
                      name="phone"
                      placeholder="0123456789"
                      pattern="\d{10}"
                      value={this.state.userData.phone}
                      title="Enter a valid contact number."
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label for="name">E-mail:</label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      value={this.state.userData.email}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label for="name">City: </label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={this.state.userData.city}
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label for="Country">Country: </label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      name="country"
                      className="form-control"
                      value={this.state.userData.country}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label for="company">Company:</label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      className="form-control"
                      name="company"
                      value={this.state.userData.company}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label for="school">School:</label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      name="school"
                      className="form-control"
                      value={this.state.userData.school}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label for="homeTown">Home Town: </label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      name="homeTown"
                      className="form-control"
                      placeholder="HomeTown"
                      value={this.state.userData.homeTown}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label for="languages">Languages: </label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      name="languages"
                      className="form-control"
                      placeholder="languages"
                      value={this.state.userData.languages}
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label for="gender">Gender </label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      className="radio-inline"
                      onChange={this.onChange}
                      checked={this.state.userData.gender === "Male"}
                    />
                    Male&nbsp;
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      className="radio-inline"
                      onChange={this.onChange}
                      checked={this.state.userData.gender === "Female"}
                    />
                    Female
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    value="Submit"
                    className="btn btn-primary"
                  >
                    Update
                  </button>{" "}
                  <button className="btn btn-danger">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  //login: PropTypes.func.isRequired,
  profile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});
/*
export default connect(
  mapStateToProps,
  { updateProfile }
)(withRouter(Profile)); */

export default connect(
  null,
  getProfile
)(withRouter(Profile));
