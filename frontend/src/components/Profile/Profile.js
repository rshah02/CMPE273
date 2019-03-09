import React,{Component} from 'react'
import jwt_decode from 'jwt-decode'


class Profile extends Component{
    constructor(){
        super()
        this.state={
            name:"",
            email:"",
            phone:"",
            city:"",
            country:"",
            gender:"",
            school:"",
            company:"",
            languages:"",
            profileImage:"",
            hometown:""

        }
    }

    componentDidMount(){
        const token=localStorage.usertoken
        const decoded=jwt_decode(token)
        this.setState({
            name:decoded.name,
            email:decoded.email,
            phone:decoded.phone,
            city:decoded.city,
            country:decoded.country,
            gender:decoded.gender,
            school:decoded.school,
            company:decoded.company,
            languages:decoded.languages,
            profileImage:decoded.profileImage,
            homeTown:decoded.homeTown
        })
    }

    render(){
            return(
                <div className="container">
                    <div className="row">
                        <form onSubmit={this.onSubmit}>
                            <div className="col-md-4">
                                <img src="#" alt="profilePhoto"></img>
                            </div>
                            <div className="col-md-8">
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
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Phone Number</label>
                                    <input type="phone" 
                                    className="form-control" 
                                    name="phone" 
                                    value={this.state.phone}
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
                                    <label htmlFor="school">School</label>
                                    <input type="text" 
                                    className="form-control" 
                                    name="school" 
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="company">Company</label>
                                    <input type="text" 
                                    className="form-control" 
                                    name="company" 
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lanuages">Languages known</label>
                                    <input type="text" 
                                    className="form-control" 
                                    name="languages" 
                                    value={this.state.languages}
                                    onChange={this.onChange}
                                    />
                                </div>
                                <button className="btn btn-primary btn-block">Update</button>
                            </div>
                        </form>
                
                </div>
                </div>
            )
    }
}

export default Profile