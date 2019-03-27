import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
class courses extends Component {
    constructor() {
        super();
        this.state = {
            userId: '',
            books: []
        }
    }
    //get the books data from backend  
    componentDidMount() {
        axios.get('http://localhost:3001/users/courses', { params: { userId: "346" } })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    books: [...this.state.books, ...response.data]
                });
            });
    }

    render() {
        //iterate over books to create a table row
        let details = this.state.books.map(book => {
            return (
                <tr>
                    <td>{book.courseDept}</td>
                    <td>{book.courseId}</td>
                    <td>{book.courseName}</td>
                    <td>{book.courseDescription}</td>
                </tr>
            )
        })
        //if not logged in go to login page
        /*  let redirectVar = null;
          if (!cookie.load('cookie')) {
              redirectVar = <Redirect to="/login" />
          } */
        return (
            <div>

                <div class="container">
                    <h2>List of All courses</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Course Department</th>
                                <th>Course ID</th>
                                <th>Course Title</th>
                                <th>Course Description</th>

                            </tr>
                        </thead>
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            {details}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
//export Home Component
export default withRouter(courses);