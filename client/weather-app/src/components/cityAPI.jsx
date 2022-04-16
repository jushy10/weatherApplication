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
            url: 'http://localhost:3001/cityAPI', //Backend Pull
            params: { city: name },
        }

        axios.request(options).then((response) => {

            setCity(response.data.cityName + ',')
            setTemp(response.data.currentTemp + '°C')
            setCond(response.data.condition)
            setIcon(response.data.icon)
            setFeelsLike(response.data.feelslike + '°C')
            setHumidity(response.data.humidity + '%')
            setWind(response.data.wind + ' km/h')
            setCountry(response.data.countryName)

        }).catch((error) => {
            console.error(error)
        })
    }

    return (
      <div className='app'>
            <div className="search">
                <form onSubmit={handleSubmit}>
                    <input onChange={everyChange} placeholder="Enter Location"></input>
                </form>

                <div className='container'>
                    <div className='top'>
                        <div className='location'>
                            <p>{city} {country}</p>
                        </div>
                        <div className='temp'>
                            <h1 style={{fontSize: "6rem"}}>{temp}</h1>
                        </div>
                        <div className='description'>
                            <p>{condition}</p>
                            <div className='image'>
                                <img src={conditionIcon} alt=''></img>
                            </div>
                        </div>
                    </div>

                    {feelsLike !== '' && humidity !== '' && wind !== '' &&
                    <div className='bottom'>
                        <div className='feels'>
                            <p className='bold'>{feelsLike}</p>
                            {feelsLike !== '' &&
                            <p>Feels Like</p>
                            }
                        </div>
                        <div className='humidity'>
                            <p className='bold'>{humidity}</p>
                            {humidity !== '' &&
                            <p>Humidity</p>
                            }
                        </div>
                        <div className='wind'>
                            <p className='bold'>{wind}</p>
                            {wind !== '' &&
                            <p>Wind Speed</p>
                            }
                        </div>
                    </div>
                    }
                    
                </div>
            </div>
        </div>   
    );


}

export default CityAPI;

