import React, { Component } from 'react'
import Button from '../Button'
import Input from '../Input'

class Form extends Component {
    constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({value: ''});
        this.props.handleParentSubmit(this.state.value);

    }
    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <Input placeholder="VIN" onChange={this.handleChange} value={this.state.value} />
                    <Button value="ADD" />
                </form>
            </div>
        )
    }
}

export default Form;