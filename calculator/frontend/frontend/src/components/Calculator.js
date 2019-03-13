import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as API from '../api/ComputationAPI';
import Display from './Display';
import '../calculator.css';
class Calculator extends Component {

    state = {
        result: ""
    };
    handleComputation = (expression) => {
        const Expression = { "exp": expression };
        API.doComuptation(Expression)
            .then((res) => {
                if (res.finalResult === null) {
                    this.setState({
                        result: "Infinity"
                    });
                } else {
                    this.setState({
                        result: res.finalResult
                    });
                }
            });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4"> </div>
                    <div className="col-lg-4">
                        <div className="row box-project border border-dark rounded">
                            <legend className="legendCss">Calculator</legend>
                            <Display handleComputation={this.handleComputation}
                                result={this.state.result} />
                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        )
    }


}

export default withRouter(Calculator);