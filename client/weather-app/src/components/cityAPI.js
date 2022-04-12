import axios from 'axios'
import { useState } from 'react';
import React from 'react';
import "../styles/city.css"

const CityAPI = () => {

    const [name, setName] = useState(''); //String
    const [returnedCity, passedCity] = useState('');
    const [returnedTemp, passedTemp] = useState('');

    const [returnedCondition, passedCond] = useState('');
    const [returnedConditionIcon, passedIcon] = useState('');
    const [returnedFeelsLike, passedFeelsLike] = useState('');
    const [returnedHumidity, passedHumidity] = useState('');
    const [returnedWind, passedWind] = useState('');


    const handleSubmit = (e) => {

        e.preventDefault();

        // console.log(`Form submitted, ${name}`); 

        getAPI(name);
    }

    const everyChange = (e) => {
        setName(e.target.value)
        // console.log("Test")

    }

    const setCityName = (e) => { passedCity(e) }
    const setTemperature = (e) => { passedTemp(e) }
    const setCityCond = (e) => { passedCond(e) }
    const setCondIcon = (e) => { passedIcon(e) }
    const setFeelsLike = (e) => { passedFeelsLike(e) }
    const setHumidity = (e) => { passedHumidity(e) }
    const setWind = (e) => { passedWind(e) }


    const getAPI = (name) => {
        const options = {
            method: 'GET',
            url: 'http://localhost:3001/results', //Backend Pull
            params: { city: name },
        }

        axios.request(options).then((response) => {
            console.log(response.data)
            console.log(response.data.cityName)
            setCityName(response.data.cityName)
            setTemperature(response.data.currentTemp)
            setCityCond(response.data.condition)
            setCondIcon(response.data.icon)
            setFeelsLike(response.data.feelslike)
            setHumidity(response.data.humidity)
            setWind(response.data.wind)

        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <div className="search">
            <form onSubmit={handleSubmit}>
                <input onChange={everyChange} placeholder="Enter Location"></input>
            </form>
            <div className='container'>
                <div className='top'>
                    <div className='location'>
                        <p>{returnedCity}</p>
                    </div>
                    <div className='temp'>
                        <h1>{returnedTemp}°C</h1>
                    </div>
                    <div className='description'>
                        <p>{returnedCondition}</p>
                        <img src={returnedConditionIcon}></img>
                    </div>
                </div>

                <div className='bottom'>
                    <div className='feels'>
                        <p className='bold'>{returnedFeelsLike}°C</p>
                        <p>Feels Like</p>
                    </div>
                    <div className='humidity'>
                        <p className='bold'>{returnedHumidity}%</p>
                        <p>Humidity</p>
                    </div>
                    <div className='wind'>
                        <p className='bold'>{returnedWind}KM/H</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default CityAPI;

