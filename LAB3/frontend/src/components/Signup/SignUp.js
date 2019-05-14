import React, { Component } from "react";
import PropTypes from "prop-types";
//import { signup } from "../UserFunctions";
import { connect } from "react-redux";
//import { signup } from "../../actions/authaction";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import { signup } from "../../mutations/mutations";
import { graphql } from "react-apollo";
//Define a Login Component
class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      gender: "",
      type: "",
      phone: "",
      email: "",
      password: "",
      city: "",
      country: "",
      company: "",
      school: "",
      languages: "",
      errors: {},
      isNewUserCreated: false,
      isDuplicateUser: false
    };

    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // onSubmit(e) {
  //   e.preventDefault();

  //   const user = {
  //     name: this.state.name,
  //     email: this.state.email,
  //     type: this.state.type,
  //     password: this.state.password
  //   };

  //   this.props.signup(user, this.props.history);

  //   /*signup(user).then(res => {
  //     this.props.history.push(`/login`);
  //   }); */
  // }
  submitSignup = e => {
    e.preventDefault();
    this.props
      .signup({
        variables: {
          name: this.state.name,
          type: this.state.type,
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(response => {
        console.log("Resposne", response);
        if (response.data.signup.success == true) {
          this.setState({
            isNewUserCreated: true
          });
        }
        if (response.data.signup.duplicateUser == true) {
          this.setState({
            isDuplicateUser: true
          });
        }
      });
  };

  render() {
    const { errors } = this.state;
    let redirectVar = null;
    let errorPanel = null;

    if (this.state.isNewUserCreated == true) {
      redirectVar = <Redirect to="/" />;
    }
    if (this.state.isDuplicateUser == true) {
      errorPanel = (
        <div>
          <div className="alert alert-danger" role="alert">
            <strong>Validation Error!</strong> User Already exists!
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        {redirectVar}
        <div className="row">
          <div className="col-lg-3" />
          <div className="col-lg-6 signin auth">
            {errorPanel}
            <form noValidate onSubmit={this.submitSignup}>
              <h1 className="h3 mb-3 font-weight-bold">Sign Up</h1>

              <div className="form-group">
                <label htmlFor="name">Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
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
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="type"
                    value="Faculty"
                    onChange={this.onChange}
                  />{" "}
                  Faculty{" "}
                </label>
                &nbsp;&nbsp;
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="type"
                    value="Student"
                    onChange={this.onChange}
                  />
                  Student{" "}
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register
              </button>
            </form>
          </div>
          <div className="col-lg-3" />
        </div>
      </div>
    );
  }
}
//export Login Component
// SignUp.PropTypes = {
//   signup: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  signupStateStore: state.signup
});

// export default connect(
//   mapStateToProps,
//   { signup }
// )(withRouter(SignUp));
export default graphql(signup, { name: "signup" })(SignUp);
