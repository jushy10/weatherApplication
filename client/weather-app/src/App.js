import './App.css';
import React from 'react';

// import ApiComponent from './components/currentAPI';
// import MyForm from './components/MyForm';
import CityAPI from './components/cityAPI';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  
  return (
    
    <>
    <Navbar className="navtop" bg="dark" variant="dark">
      
      <Navbar.Brand className="title" href="/">Weather App</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link className="menu" href="/">Home</Nav.Link>
        <Nav.Link className="menu" href="#features">Forecast</Nav.Link>
        <Nav.Link className="menu" href="#pricing">Data</Nav.Link>
      </Nav>
     
    </Navbar>
    
    
      <div className="app">
        <CityAPI></CityAPI>
  
      </div>
      </>
  );
}

export default App;
 