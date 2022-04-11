import axios from 'axios'
import { useState } from 'react';
import React from 'react';
import "../styles/city.css"

const CityAPI = () => {

    const [name, setName] = useState(''); //String
    const [returnedCity, passedCity] = useState('');
    const [returnedTemp, passedTemp] = useState('');
   
    
    const handleSubmit = (e) => {
    
        e.preventDefault();

        // console.log(`Form submitted, ${name}`); 

        getAPI(name);
    } 

    const everyChange = (e) => {
        setName(e.target.value)
        // console.log("Test")

    }

    const setCityName = (e) => {passedCity(e)}
    const setTemperature = (e) => {passedTemp(e)}



    const getAPI = (name) => {
        const options = {
            method: 'GET',
            url: 'http://localhost:3001/results', //Backend Pull
            params: {city: name},
        }

        axios.request(options).then((response) => {
            console.log(response.data)
            console.log(response.data.cityName)
            setCityName(response.data.cityName)
            setTemperature(response.data.currentTemp)

        }).catch((error) => {
            console.error(error)
        })
    }

        return (
            <div className="search">
                <form onSubmit = {handleSubmit}>
                    <input onChange = {everyChange}></input>
                    <button type = 'submit'>Submit</button>
                </form>

               <div className ="city">{returnedCity}</div> 
               <div className ="temp">{returnedTemp}°C</div> 
            </div>
            
        );


}

export default CityAPI;

