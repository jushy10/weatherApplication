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
        //Calls API right away on component mount
        this.forecastAPI();
    }

    async forecastAPI() {
        const options = {
            method: 'GET',
            url: 'http://localhost:3001/history', //Backend Pull
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

    buttonInput(input) {
        sessionStorage.setItem('cityName', JSON.stringify(input))
    }

    render() {
        return (
            <>
            <div className = "historypage">
            <br></br><br></br>
            <center><h1 >10 Recent Unique Searches</h1></center>
            <br></br>
            <div className = "historyBubble">
            {this.state.dataArray && this.state.dataArray.map((data => (
                <div>
                <button type="button" onClick={(e) => this.buttonInput(e.currentTarget.value)} value={data}><p>{data}</p></button>
                <br></br></div>
                // <h2>{data}</h2>
            )))}
            </div>
            </div>
            </>
        ); 
    }

}





export default History;