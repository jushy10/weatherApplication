import axios from 'axios'
import { useState } from 'react';
import React from 'react';

const ForecastAPI = () => {

    const [name, setName] = useState('');

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
            url: 'http://localhost:3001/forecastAPI', //Backend Pull
            params: { city: name },
        }

        axios.request(options).then((response) => {
            console.log(response.data);

        }).catch((error) => {
            console.error(error)
        })
    }


    return (
        <form onSubmit={handleSubmit}>
            <input onChange={everyChange} placeholder="Enter Location"></input>
        </form>
    )

}

export default ForecastAPI;
