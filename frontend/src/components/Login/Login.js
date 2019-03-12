import React, {Component} from 'react';
import '../../App.css';
import {login} from '../UserFunctions'

class Login extends Component{

    constructor(){
        super();
        this.state = {
            email: "",
            password : "",
        }

        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }
    
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        e.preventDefault()
        console.log("submit")
        
        const user={
            email:this.state.email,
            password:this.state.password
        }

        login(user).then(res=>{
            console.log("login passed "+res)
            if(res){
                this.props.history.push(`/profile`)
            }
        })
    }  

    render(){   
        return(
            <div>    
            <div className="loginHeader">
                <div className="headerBackground">
                </div>
                <div className="loginHeaderContainer">
                    <h1>Connecting to</h1>
                    <div className="loginLogo">
                    <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs0kbuxex4ds7v2rN0x7" alt="SJSU Application Portal" class="logo sanjosestateuniversity_sjsuapplicationportal_1"/>
                    </div>
                </div>
            </div>
            <div className="signin auth">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-bold">Sign In</h1>
                            <div className="form-group">
                                <input type="email" 
                                className="form-control" 
                                name="email" 
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.onChange}
                                />
                            </div>
                             <div className="form-group">
                                <input type="password" 
                                className="form-control" 
                                name="password" 
                                placeholder="Enter password"
                                value={this.state.password}
                                onChange={this.onChange}
                                />
                            </div>
                            <button type="submit"className="btn btn-lg btn-primary btn-block">
                                Sign In
                            </button>
                        </form>
                </div>
            </div>
        </div>
        </div>
        )
    }
}
export default Login