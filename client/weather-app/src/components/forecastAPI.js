import axios from 'axios'
import { useState } from 'react';
import React from 'react';

const ForecastAPI = () => {

    const [cityInput, setCityInput] = useState('');

    const [maxTemp, setMaxTemp] = useState('');
    
    const [minTemp, setMinTemp] = useState('');

    const [avgTemp, setAvgTemp] = useState('');

    const [condition, setCondition] = useState('');

    const [conditionIcon, setConditionIcon] = useState('');

    const [chanceOfRain, setChanceOfRain] = useState('');


    const handleSubmit = (e) => {

        e.preventDefault();

        getAPI(cityInput);
    }

    const everyChange = (e) => {

        setCityInput(e.target.value)
    }


    const printOut = (maxTemp) => {
        return (
            <h1>{maxTemp}</h1>
        );

    }

    const getAPI = (cityInput) => {
        const options = {
            method: 'GET',
            url: 'http://localhost:3001/forecastAPI', //Backend Pull
            params: { city: cityInput },
        }

        axios.request(options).then((response) => {
            for (let i = 0; i < 3; i++) {
                console.log(response.data.forecast[i]);

                setMaxTemp(response.data.forecast[0].day.maxtemp_c)
                setMinTemp(response.data.forecast[0].day.mintemp_c)
                setAvgTemp(response.data.forecast[0].day.avgtemp_c)
                setCondition(response.data.forecast[0].day.condition.text)
                setConditionIcon(response.data.forecast[0].day.condition.icon)
                setChanceOfRain(response.data.forecast[0].day.daily_chance_of_rain)
            }

        }).catch((error) => {
            console.error(error)
        })
    }


    return (
        <>
        <form onSubmit={handleSubmit}>
            <input onChange={everyChange} placeholder="Enter Location"></input>
        </form>
        <div>
            {printOut(maxTemp)}
        </div>

        </>
    )

}

export default ForecastAPI;
