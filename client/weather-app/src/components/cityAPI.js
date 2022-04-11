import axios from 'axios'
import { useState } from 'react';
import React from 'react';

const CityAPI = () => {

    const [name, setName] = useState(''); //String
    
    const handleSubmit = (e) => {
    
        e.preventDefault();

        // console.log(`Form submitted, ${name}`); 

        getAPI(name);
    } 

    const everyChange = (e) => {
        setName(e.target.value)
        // console.log("Test")

    }


    const getAPI = (name) => {
        const options = {
            method: 'GET',
            url: 'http://localhost:3001/results', //Backend Pull
            params: {city: name},
        }

        axios.request(options).then((response) => {
            console.log(response.data)
            console.log(response.data.cityName)

        }).catch((error) => {
            console.error(error)
        })
    }

        return (
            <div className="app2">
                <form onSubmit = {handleSubmit}>
                    <input onChange = {everyChange}></input>
                    <button type = 'submit'>Submit</button>
                </form>

            </div>
            
        );


}

export default CityAPI;

