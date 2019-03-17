import React, { Component } from 'react'
import createStreamerFrom from '../../api/streamer'
import generateCarData from '../../api/data-generator'
import EventNotification from '../EventNotification'
import Checkbox from '../Checkbox'


class ListWatch extends Component {
    streamers = {}
    state = { carData: {}, cars: [], maxFuel: 1}

    constructor (props) {
        super(props);
        this.state = {
            ...props,
            cars: [],
            maxFuel: 1
        };
        this.handleChange = this.handleChange.bind(this);
    }

    updateState = carData => {
        let cars = this.prepareCars(this.state.cars, carData);
        this.setState({ cars: cars});
    }

    prepareCars = (cars, carData) => {
        let isExist = cars.findIndex(item => item.vin === carData.vin);
        if(isExist === -1){
            cars.push(carData);
        } else {
            cars[isExist] = carData;
        }
        cars = cars.filter(this.filterFuel)
        return cars;
    }

    filterFuel = carData => {
         carData = this.addAdditionalFields(carData)
         if(!carData.active) return;
         return carData.fuel <= this.state.maxFuel? carData : false;
    }

    addAdditionalFields = carData => {
        let {vinCodes} = this.state
        let currentColor = vinCodes.findIndex(item => item.vin === carData.vin ? true : false)
        carData.color = vinCodes[currentColor].color;
        carData.active = vinCodes[currentColor].active;
        return carData;
    }

    handleChange = event => {
        let maxFuel = event.target.checked? 0.15 : 1
        this.setState({'maxFuel': maxFuel});
    }

    componentWillReceiveProps(nextProps){
        let {vinCodes} = nextProps;
        vinCodes.map((item,i) => {
            if((this.streamers[item.vin])) {
                this.streamers[item.vin].stop()
                this.streamers[item.vin].removeHandler()
            }
            if(item.active) {
                this.streamers[item.vin] = createStreamerFrom(() => generateCarData(item.vin))
                this.streamers[item.vin].subscribe(this.updateState)
                this.streamers[item.vin].start()
            }
            return true;
        })
    }

    render() {
        if(!this.state.cars) return (<div className="App-no-found">No Found</div>)
        return (
            <div className="App-list-watch">
                <div className="fixed-container">
                    <Checkbox children="Filter events where fuel level is under 15%" onChange={this.handleChange} />
                </div>

                    {this.state.cars.map((item,i) => {
                        return <EventNotification carEvent={item} color={item.color} key={i} />
                    })}

            </div>
        )
    }
}

export default ListWatch
