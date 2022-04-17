import './App.css';
import React, { Component } from 'react';

import HomePage from './components/HomePage';
import ThreeDayForecast from './components/ThreeDayForecast'
import HourlyForecast from './components/HourlyForecast';

import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Routes, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
  this.state = {
    cityName: JSON.parse(window.localStorage.getItem('cityName')) || {
      cityName: ''
    }
  }

  this.changeCity = this.changeCity.bind(this)
}

  changeCity(cityName){
    window.localStorage.setItem('cityName', JSON.stringify(cityName))
    super.setState(cityName);


  //   this.setState({ cityName: input }, () => 
  //     console.log(this.state.cityName)
  // );
  }

  render() {
    return (
      <>
      <Navbar className="navtop" bg="dark" variant="dark">
        <Navbar.Brand className="title" href="/home">Weather App</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="menu" href="/home">Home</Nav.Link>
          <Nav.Link className="menu" href="/3dforecast">3 Day Forecast</Nav.Link>
          <Nav.Link className="menu" href="/hourlyforecast">Hourly Forecast</Nav.Link>
        </Nav>
      </Navbar>
      
      
      <Routes>
        <Route path='/home'><div className='app'><HomePage cityInput = {this.state.cityName} changeCity={this.changeCity}/></div></Route>
        <Route path='/3dforecast'><ThreeDayForecast cityInput = {this.state.cityName} changeCity={this.changeCity}/></Route>
        <Route path='/hourlyforecast'><HourlyForecast cityInput = {this.state.cityName} changeCity={this.changeCity}/></Route>
      </Routes>
      
      </>

    );
  }
}

export default App;
 