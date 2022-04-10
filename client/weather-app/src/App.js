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
      <CityAPI></CityAPI>

    </div>


    //   <h2 className='title'>Weather App</h2>
    //   <div className="search">
    //     <input type="text" placeholder="Enter Location"></input>
    //   </div>

    //   <div className="container">
    //     <div className="top">
    //       <div className="location">
    //         <p>Toronto</p>
    //       </div>
    //       <div className="temp">
    //         <h1>15°C</h1>
    //       </div>
    //       <div className="description">
    //         <p>Cloudy with Rain</p>
    //       </div>
    //     </div>

    //     <div className="bottom">
    //       <div className="feels">
    //         <p className='bold'>7°C</p>
    //         <p>Feels Like</p>
    //       </div>
    //       <div className="humidity">
    //         <p className='bold'>14%</p>
    //         <p>Humidity</p>
    //       </div>
    //       <div className="wind">
    //         <p className='bold'>6 KM/H</p>
    //         <p>Wind Speed</p>
    //       </div>
    //     </div>
        
    //   </div>
    // </div>
  );
}

export default App;
