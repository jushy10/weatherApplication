import React from 'react'
import $ from 'jquery';

export default class PersonComponent extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        cityName: "",
        currentTemp: "",
        condition: "",
        humidity: "",
        icon: "",
      }
    }
  
    componentDidMount() {
      this.fetch();
    }
  
    fetch() {
      var context = this;
  
      $.ajax({
        url: 'http://localhost:3001/api/',
        method: 'GET',
        success: function(response) {
          context.setState({
            cityName: response.cityName,
            currentTemp: response.currentTemp,
            condition: response.condition,
            humidity: response.humidity,
            icon: response.icon,

          });
        }
      });
    }
  
    render() {
        // console.log(this.state);
      return (
        <div>
          <h1>{this.state.cityName}</h1>
          <h1>{this.state.currentTemp}</h1>
          <h1>{this.state.condition}</h1>
          <h1>{this.state.humidity}</h1>
          <img src={this.state.icon}></img>
        </div>
      );
    }
  }