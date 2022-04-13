import './App.css';
import React from 'react';

import CityAPI from './components/cityAPI';
import ForecastAPI from './components/forecastAPI';

import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <>
    <Navbar className="navtop" bg="dark" variant="dark">
      <Navbar.Brand className="title" href="/home">Weather App</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link className="menu" href="/home">Home</Nav.Link>
        <Nav.Link className="menu" href="/forecast">Forecast</Nav.Link>
        {/* <Nav.Link className="menu" href="#pricing">Data</Nav.Link> */}
      </Nav>
    </Navbar>
    
    
    <Routes>
      <Route path='/home'><div className='app'><CityAPI/></div></Route>
      <Route path='/forecast'><ForecastAPI/></Route>
    </Routes>

    </>

  );
}

export default App;
 