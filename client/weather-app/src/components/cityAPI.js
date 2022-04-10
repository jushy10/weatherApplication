import axios from 'axios'
import {useEffect, useState} from 'react';

const cityAPI = () => {
    const getAPI = () => {
        const options = {
            method: 'GET',
            url: 'http://localhost:3001/results', //Backend Pull
            params: {city: 'Toronto'},
        }

        axios.request(options).then((response) => {
            console.log(response.data)
            console.log(response.data.cityName)

        }).catch((error) => {
            console.error(error)
        })
    }

    getAPI();

        return (
            <div className="app">
                Hello
                {/* response.data */}
            </div>
            
        );


}

export default cityAPI;

