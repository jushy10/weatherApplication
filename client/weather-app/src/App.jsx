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
        city: JSON.parse(window.localStorage.getItem('cityName')) || ''
    }
}

  changeCity(cityName){
    window.localStorage.setItem('cityName', JSON.stringify(cityName))
    this.setState({city: cityName});
  }



  render() {
    return (
      <>
      <div>
      <Navbar className="navtop" bg="dark" variant="dark">
        <Navbar.Brand className="title" href="/home">Weather App</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="menu" href="/homepage">Home</Nav.Link>
          <Nav.Link className="menu" href="/3dforecast">3 Day Forecast</Nav.Link>
          <Nav.Link className="menu" href="/hourlyforecast">Hourly Forecast</Nav.Link>
        </Nav>
        {/* {this.state.city &&
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Current Location: {this.state.city}&emsp;&emsp;
          </Navbar.Text>
        </Navbar.Collapse>
        } */}
      </Navbar>
      </div>
      
      <Routes>
        <Route path='/homepage'><div className='app'><HomePage cityInput = {this.state.city} changeCity={this.changeCity}/></div></Route>
        <Route path='/3dforecast'><ThreeDayForecast cityInput = {this.state.city} changeCity={this.changeCity}/></Route>
        <Route path='/hourlyforecast'><HourlyForecast cityInput = {this.state.city} changeCity={this.changeCity}/></Route>
      </Routes>
      
      </>

    );
  }
}

export default App;
 