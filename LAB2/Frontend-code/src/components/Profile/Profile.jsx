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
      userData: "",
      name: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      homeTown: "",
      school: "",
      company: "",
      languages: "",
      gender: "",
      about: ""
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
    let Token = localStorage.jwtToken;
    const user = {
      name: this.state.name,
      email: this.state.email,
      //avatar: this.state.userData.avatar,
      type: this.state.type,
      city: this.state.city,
      phone: this.state.phone,
      country: this.state.country,
      school: this.state.school,
      company: this.state.company,
      languages: this.state.languages,
      homeTown: this.state.homeTown,
      about: this.state.about
    };
    axios
      .post(window.base_url + "/users/profile", user, {
        headers: { Authorization: Token }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          userData: response.data,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          city: response.data.city,
          country: response.data.country,
          homeTown: response.data.homeTown,
          school: response.data.school,
          company: response.data.company,
          languages: response.data.languages,
          gender: response.data.gender,
          about: response.data.about
        });
      });

    //this.props.updateProfile(user);
    /* profile(user).then(res => {
      this.props.history.push(`/profile`);
    });*/
  }

  componentWillMount() {
    //this.props.getProfile();
    let Token = localStorage.jwtToken;
    const decoded = jwt_decode(Token);
    console.log("server token:" + Token);
    console.log(decoded);
    axios
      .get(window.base_url + "/users/profile", {
        params: { email: decoded.email },
        headers: { Authorization: Token }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          userData: response.data,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          city: response.data.city,
          country: response.data.country,
          homeTown: response.data.homeTown,
          school: response.data.school,
          company: response.data.company,
          languages: response.data.languages,
          gender: response.data.gender,
          about: response.data.about
        });
      });
  }
  logOut(e) {
    //e.prventDefault()
    localStorage.removeItem("jwtToken");

    this.props.history.push("login");
  }
  render() {
    return (
      <div>
        <Navbar />

        <div className="container">
          <div className="row">
            <div className="col-lg-3" />
            <div className="col-lg-6">
              <h4>Profile</h4>
              <br />

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <div className="col-lg-3" />
                  <div className="col-lg=9">
                    <input type="file" />
                    <img
                      src="https://sjsu.instructure.com/images/thumbnails/52746627/2UmxWxdoeiQm1sLPurRmS4L2qqtF4yYhxpYt20sB"
                      alt="Rohankumar Shah"
                      onChange={this.onChange}
                      className="rounded-circle center"
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label labelfor="name">Name: </label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      name="name"
                      placeholder="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    {" "}
                    <label labelfor="Phone">Phone: </label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      className="form-control"
                      type="text"
                      name="phone"
                      placeholder="0123456789"
                      pattern="\d{10}"
                      value={this.state.phone}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label labelfor="name">E-mail:</label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label labelfor="name">City: </label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={this.state.city}
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label labelfor="Country">Country: </label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      name="country"
                      className="form-control"
                      value={this.state.country}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label labelfor="company">Company:</label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      className="form-control"
                      name="company"
                      value={this.state.company}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label labelfor="school">School:</label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      name="school"
                      className="form-control"
                      value={this.state.school}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label labelfor="homeTown">Home Town: </label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      name="homeTown"
                      className="form-control"
                      placeholder="HomeTown"
                      value={this.state.homeTown}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label labelfor="languages">Languages: </label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      name="languages"
                      className="form-control"
                      placeholder="languages"
                      value={this.state.languages}
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <div className="form-group form-inline">
                  <div className="col-lg-3">
                    <label labelfor="gender">Gender </label>
                  </div>
                  <div className="col-lg-9">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      className="radio-inline"
                      onChange={this.onChange}
                      checked={this.state.gender === "Male"}
                    />
                    Male&nbsp;
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      className="radio-inline"
                      onChange={this.onChange}
                      checked={this.state.gender === "Female"}
                    />
                    Female
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    value="Submit"
                    className="btn btn-primary log"
                  >
                    Update
                  </button>{" "}
                  <button className="btn btn-danger log">Cancel</button>
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
  //profile: PropTypes.func.isRequired,
  //auth: PropTypes.object.isRequired
  //errors: PropTypes.object.isRequired
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
