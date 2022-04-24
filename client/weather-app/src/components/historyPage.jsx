import React, { Component } from "react";

import axios from "axios";
import "../styles/history.css"

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
            <div className = "historypage">
            <br></br><br></br>
            <center><h1 >10 Recent Unique Searches</h1></center>
            <br></br>
            <div className = "history">
            {this.state.dataArray && this.state.dataArray.map((data => (
                <h2>{data}</h2>
            )))}
            </div>
            </div>
            </>
        ); 
    }

}





export default History;