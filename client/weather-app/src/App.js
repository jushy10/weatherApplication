// import logo from './logo.svg';
import './App.css';
import React from 'react';

import ApiComponent from './components/currentAPI';
import MyForm from './components/MyForm';
import CityAPI from './components/cityAPI';



function App() {
  
  return (
  
    <div className="app">
      {/* <MyForm></MyForm> */}
      <h2 className='title'>Weather App</h2>
      <CityAPI></CityAPI>
    </div>
  );
}

export default App;
