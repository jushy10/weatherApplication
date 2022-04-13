import axios from 'axios'
import { useState } from 'react';
import React from 'react';
import "../styles/city.css"

const CityAPI = () => {

    const [name, setName] = useState(''); //String
    const [city, setCity] = useState('');
    const [temp, setTemp] = useState('');
    const [condition, setCond] = useState('');
    const [conditionIcon, setIcon] = useState('');
    const [feelsLike, setFeelsLike] = useState('');
    const [humidity, setHumidity] = useState('');
    const [wind, setWind] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();

        getAPI(name);
    }

    const everyChange = (e) => {

        setName(e.target.value)
    }

    const getAPI = (name) => {
        const options = {
            method: 'GET',
            url: 'http://localhost:3001/results', //Backend Pull
            params: { city: name },
        }

        axios.request(options).then((response) => {
           
            setCity(response.data.cityName)
            setTemp(response.data.currentTemp + '°C')
            setCond(response.data.condition)
            setIcon(response.data.icon)
            setFeelsLike(response.data.feelslike)
            setHumidity(response.data.humidity)
            setWind(response.data.wind)
            setCountry(response.data.countryName)

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
                        <p>{city}, {country}</p>
                    </div>
                    <div className='temp'>
                        <h1>{temp}</h1>
                    </div>
                    <div className='description'>
                        <p>{condition}</p>
                        <div className='image'>
                            <img src={conditionIcon} alt=''></img>
                        </div>
                    </div>
                </div>

                <div className='bottom'>
                    <div className='feels'>
                        <p className='bold'>{feelsLike}°C</p>
                        <p>Feels Like</p>
                    </div>
                    <div className='humidity'>
                        <p className='bold'>{humidity}%</p>
                        <p>Humidity</p>
                    </div>
                    <div className='wind'>
                        <p className='bold'>{wind} km/h</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default CityAPI;

