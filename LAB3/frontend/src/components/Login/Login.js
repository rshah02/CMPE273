import React, { Component } from "react";
import "../../App.css";
//import { login } from "../../actions/authaction";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import { login } from "../../queries/queries";

import { graphql } from "react-apollo";

import { withApollo } from "react-apollo";
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isAuthenticated: false,
      validationFailure: false
    };

    this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
    this.submitLoginData = this.submitLoginData.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/Profile");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  submitLoginData = e => {
    e.preventDefault();

    this.props.client
      .query({
        query: login,
        variables: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(response => {
        console.log("Response", response.data);
        console.log("UserData", response.data.login.result);
        if (response.data.login.result == true) {
          localStorage.setItem("name", response.data.login.userData.name);
          localStorage.setItem("type", response.data.login.userData.type);
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("_id", response.data.login.userData._id);
          localStorage.setItem("email", response.data.login.userData.email);

          this.setState({
            isAuthenticated: true
          });
        } else {
          this.setState({
            validationFailure: true
          });
        }
      });
  };
  render() {
    const { errors } = this.state;
    let redrirectVar = null;
    console.log(this.state.isAuthenticated);
    if (this.state.isAuthenticated === true) {
      redrirectVar = <Redirect to="/Profile" />;
    }

    return (
      <div>
        <div className="container auth">
          {redrirectVar}
          <div className="row">
            <div className="col-lg-4" />
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-6 loginHeaderContainer">
                  <h1>Connecting to</h1>
                </div>
                <div className="col-lg-6 loginHeaderContainer">
                  <div className="loginLogo">
                    <img
                      src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs0kbuxex4ds7v2rN0x7"
                      alt="SJSU Application Portal"
                      className="logo sanjosestateuniversity_sjsuapplicationportal_1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4" />
            <div className="col-lg-4 signin auth">
              <form noValidate onSubmit={this.submitLoginData}>
                <h1 className="h3 font-weight-bold">Sign In</h1>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Sign In
                </button>
                <div className="signupLink">
                  <Link to="/signup">New user? signup here</Link>
                </div>
              </form>
            </div>
            <div className="col-lg-4" />
          </div>
        </div>
      </div>
    );
  }
}

// Login.propTypes = {
//   login: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });
// export default connect(
//   mapStateToProps,
//   { login }
// )(withRouter(Login));
// const mapStateToProps = state => ({
//   loginStateStore: state.login
// });
export default withApollo(Login);
