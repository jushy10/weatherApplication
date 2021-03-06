import './App.css';
import React, { Component } from 'react';

import HomePage from './components/HomePage';
import ThreeDayForecast from './components/ThreeDayForecast'
import HourlyForecast from './components/HourlyForecast';
import History from './components/historyPage';

import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Routes, Route, Redirect } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
        //Sets state of session storage 
        city: JSON.parse(sessionStorage.getItem('cityName')) || '',
    }
}
  //Func for other components to call to update city input
  changeCity(cityName){
	  sessionStorage.clear();
    sessionStorage.setItem('cityName', JSON.stringify(cityName))
    this.setState({city: cityName});
  }


  render() {
    return (
      <>
      <div>

      <Navbar className="navtop" bg="dark" variant="dark">
        <Navbar.Brand className="title" href="/homepage">Weather App</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="menu" href="/homepage">Home</Nav.Link>
          <Nav.Link className="menu" href="/3dforecast">3 Day Forecast</Nav.Link>
          <Nav.Link className="menu" href="/hourlyforecast">Hourly Forecast</Nav.Link>
          <Nav.Link className="menu" href="/history">History</Nav.Link>
        </Nav>
      </Navbar>
      </div>
      <Routes>
        <Route exact path='/'><Redirect to="/homepage" /></Route>
        <Route exact path='/homepage'><div className='app'><HomePage cityInput = {this.state.city} changeCity={this.changeCity}/></div></Route>
        <Route exact path='/3dforecast'><ThreeDayForecast cityInput = {this.state.city} changeCity={this.changeCity}/></Route>
        <Route exact path='/hourlyforecast'><HourlyForecast cityInput = {this.state.city} changeCity={this.changeCity}/></Route>
        <Route exact path='/history'><History/></Route>
      </Routes>
      
      </>

    );
  }
}

export default App;
 