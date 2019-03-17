import React, { Component } from 'react'
import Checkbox from '../Checkbox'

class List extends Component {

    state = {vinCodes: []}

    constructor (props) {
        super(props);
        this.state = {
            ...props
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        this.props.handleParentChange(event.target);
    }

    render() {
        let {vinCodes} = this.state
        if(!vinCodes) return (<div className="App-no-found">No Found</div>)
        return (
            <div className="App-list">
                <ul>
                {vinCodes.map((item,i) => {
                    return  <li key={i}><Checkbox children={item.vin}
                                                  color={item.color}
                                                  name={item.vin}
                                                  checked={item.active? true : false}
                                                  onChange={this.handleChange} /></li>;
                })}
                </ul>
            </div>
        )
    }
}

export default List;