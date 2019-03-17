import React, { Component } from 'react';
import './App.css';

import Form from './components/common/Form';
import List from './components/common/List';
import ListWatch from './components/common/ListWatch';


class App extends Component {
  colors = ['#00c3e8', '#f44242', '#7a41f4', '#419df4', '#f47641', '#f441eb'];
  state = {vinCodes: []}

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getColor(){
    let colors = this.colors;
    return colors[Math.floor(Math.random()*colors.length)];
  }

  handleSubmit(value) {
        let vinCodes = this.state.vinCodes;
        if(value){
            vinCodes.push({vin: value, color: this.getColor(), active: false});
        }
        this.setState({vinCodes: vinCodes});
  }

  handleChange(item){
      let vinCodes = this.state.vinCodes;
      let currentIndex = vinCodes.findIndex(car => car.vin === item.name);
      vinCodes[currentIndex].active = item.checked
      this.setState({vinCodes: vinCodes});
  }

  render() {
    return (
      <div className="App">

        <div className="App-sidebar">
            <Form handleParentSubmit={this.handleSubmit} />
            <List handleParentChange={this.handleChange} vinCodes={this.state.vinCodes}  />
        </div>
        <div className="App-container">
           <ListWatch vinCodes={this.state.vinCodes} />
        </div>
      </div>
    )
  }
}

export default App
