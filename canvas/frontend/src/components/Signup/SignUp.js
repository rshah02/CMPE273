import React, { Component } from 'react'
import { signup } from '../UserFunctions'

//Define a Login Component
class SignUp extends Component {

    constructor() {
        super()
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
            languages: ""
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            name: this.state.first_name,
            email: this.state.email,
            type: this.state.type,
            password: this.state.password
        }

        signup(user)
            .then(res => {
                this.props.history.push(`/login`)
            })
    }



    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6 signin auth">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-bold">Sign Up</h1>

                            <div className="form-group">
                                <label htmlFor="name">Name</label>

                                <input type="text"
                                    className="form-control"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />

                            </div>

                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">

                                <label className="radio-inline"><input type="radio" name="type" value="Faculty" onChange={this.onChange} /> Faculty </label>
                                &nbsp;&nbsp;

                                <label className="radio-inline"><input type="radio" name="type" value="Student" onChange={this.onChange} />Student </label>

                            </div>
                            <button type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                Register
                    </button>
                        </form>
                    </div>
                    <div className="col-lg-3"></div>
                </div>

            </div>

        );
    }
}
//export Login Component
export default SignUp