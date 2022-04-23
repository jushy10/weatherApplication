import React, { Component } from "react";

import axios from "axios";


class History extends Component {
    constructor() {
        super();
        this.state = {
        };
    }


    componentDidMount() {
        this.forecastAPI();
    }

    async forecastAPI() {
        const options = {
            method: 'GET',
            url: 'http://localhost:3001/history', //Backend Pull
            // params: { city: this.state.cityName },
        }
    
        let data = await axios.request(options)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
        this.setState({dataArray: data})
    }

    render() {
        return (
            <>
            <h1>10 Recent Unique Searches</h1>
            {this.state.dataArray && this.state.dataArray.map((data => (
                <div>{data}</div>
            )))}
            </>
        ); 
    }

}





export default History;