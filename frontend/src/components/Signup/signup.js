import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {signup} from '../UserFunctions'

//Define a Login Component
class SignUp extends Component{
    //call the constructor method
    constructor(){
        //Call the constrictor of Super class i.e The Component
        super();
        //maintain the state required for this component
        this.state = {
            name:"",
            gender:"",
            type:"",
            phone:"",
            email: "",
            password : "",
            city:"",
            country:"",
            company:"",
            school:"",
            languages:"",       
      
         
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
            name:this.state.name,
            gender:this.state.gender,
            type:this.state.type,
            phone:this.state.phone,
            email: this.state.email,
            password :this.state.password,
            city:this.state.city,
            country:this.state.country,
            company:this.state.company,
            school:this.state.school,
            languages:this.state.languages,
        }

       signup(user).then(res=>{
            if(res){
                this.props.history.push('/login')
            }
        })
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
   
    //Submit Login handler to send a request to the node backend
    
        //set the with credentials to true
      //  axios.defaults.withCredentials = true;
        //make a post request with the user data
     /*   axios.post('http://localhost:3001/login',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            }); */
    

    render(){
       
        return(
            <div>
            {/*    {redirectVar} */}
            <div class="container">
                <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                <form noValidate onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3 font-weight-bold">Sigh In</h1>
                    <div className="form-group">
                        <div className="radio">
                             <label><input type="radio" name="type" value="Faculty" checked/> Faculty </label>
                        </div>
                         <div class="radio">
                             <label><input type="radio" name="type" value="Student"/>Student </label>
                         </div>
                    </div>
                   
                    <div className="form-group">
                        <label htmlFor="email">Name</label>
                        <input type="text" 
                        className="form-control" 
                        name="name" 
                        value={this.state.name}
                        onChange={this.onChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="phone" 
                        className="form-control" 
                        name="phone" 
                        value={this.state.phone}
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
                        <label htmlFor="city">City</label>
                        <input type="text" 
                        className="form-control" 
                        name="city" 
                        value={this.state.city}
                        onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input type="text" 
                        className="form-control" 
                        name="country" 
                        value={this.state.country}
                        onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="school">school</label>
                        <input type="text" 
                        className="form-control" 
                        name="school" 
                        value={this.state.school}
                        onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <div className="radio">
                             <label><input type="radio" name="gender" value="Male"  onChange={this.onChange} checked/> Male </label>
                        </div>
                         <div class="radio">
                             <label><input type="radio" name="gender" value="Female"  onChange={this.onChange}/>Female </label>
                         </div>
                    </div>
                   

                    
                    <button type="submit"
                    className="btn btn-lg btn-primary btn-block">
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
//export Login Component
export default SignUp