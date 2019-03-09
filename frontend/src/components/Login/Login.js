import React, {Component} from 'react';
import '../../App.css';
//import axios from 'axios';
import {login} from '../UserFunctions'

//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(){
        //Call the constrictor of Super class i.e The Component
        super();
        //maintain the state required for this component
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

        const user={
            email:this.state.email,
            password:this.state.password
        }

        login(user).then(res=>{
            if(res){
                this.props.history.push(`/profile`)
            }
        })
    }
    //Call the Will Mount to set the auth Flag to false
   

    render(){
        //redirect based on successful login
       /* let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/dashboard"/>
        } */
        return(
            
           
            <div className="container">
                <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                <form noValidate onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3 font-weight-bold">Sigh In</h1>
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
                    <button type="submit"
                    className="btn btn-lg btn-primary btn-block">
                    Sign In
                    </button>
                </form>
                </div>
                </div>
                        
                        
                        </div>
        )
    }
}
//export Login Component
export default Login