import React, { Component } from 'react';
class Display extends Component {
    state = {
        expression: "",
        result: "",
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (this.props.result !== nextProps.result) {
            this.setState({ result: nextProps.result });
        }
    }
    handleExpression = (val) => {
        this.setState({
            expression: this.state.expression + val
        });
    }
    clearState = () => {
        this.setState({
            expression: "",
            result: ""
        });
    }
    render() {
        return (
            <div className="col-lg-12 box-project-inline">
                <form>
                    <div className="form-group">
                        <input id="Display" className="form-control" type="text" placeholder="Input" readOnly="readOnly" value={this.state.expression}></input>
                        <input id="Display" className="form-control" type="text" placeholder="Result" readOnly="readOnly" value={this.state.result}></input>

                    </div>
                    <div className="form-group">
                        <input className="button digits" type="button" value="7" onClick={() => this.handleExpression(7)}></input>
                        <input className="button digits" type="button" value="8" onClick={() => this.handleExpression(8)}></input>
                        <input className="button digits" type="button" value="9" onClick={() => this.handleExpression(9)}></input>
                        <input className="button mathButtons" type="button" value="+" onClick={() => { this.handleExpression('+') }}></input>
                        <br />
                    </div>
                    <div className="form-group">
                        <input className="button digits" type="button" value="4" onClick={() => this.handleExpression(4)}></input>
                        <input className="button digits" type="button" value="5" onClick={() => this.handleExpression(5)}></input>
                        <input className="button digits" type="button" value="6" onClick={() => this.handleExpression(6)}></input>
                        <input className="button mathButtons" type="button" value="-" onClick={() => { this.handleExpression('-') }}></input>
                        <br />
                    </div>
                    <div className="form-group">
                        <input className="button digits" type="button" value="1" onClick={() => this.handleExpression(1)}></input>
                        <input className="button digits" type="button" value="2" onClick={() => this.handleExpression(2)}></input>
                        <input className="button digits" type="button" value="3" onClick={() => this.handleExpression(3)}></input>
                        <input className="button mathButtons" type="button" value="*" onClick={() => { this.handleExpression('*') }}></input>
                        <br />
                    </div>
                    <div className="form-group">
                        <input className="button digits" type="button" value="C" onClick={() => this.clearState()}></input>
                        <input className="button digits" type="button" value="0" onClick={() => this.handleExpression(0)}></input>
                        <input className="button digits" type="button" value="." onClick={() => this.handleExpression('.')}></input>
                        <input className="button mathButtons" type="button" value="/" onClick={() => { this.handleExpression('/') }}></input>
                        <br />
                    </div>
                    <div className="form-group">
                        <button className="btn compute" type="button" onClick={() => { this.props.handleComputation(this.state.expression); }}>=</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Display;