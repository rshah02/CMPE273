import React, { Component } from "react";
import "../../App.css";
import { login } from "../../actions/authaction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/Dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("submit");

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(userData);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="container auth">
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
              <form noValidate onSubmit={this.onSubmit}>
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { login }
)(withRouter(Login));
