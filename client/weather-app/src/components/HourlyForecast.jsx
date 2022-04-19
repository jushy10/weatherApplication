import React, { Component } from "react";
import axios from "axios";

import { Card, Row, Col, Grid } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/forecast.css"

class HourlyForecast extends Component {
constructor() {
	super();
	this.state = {
	};
}

getTime(epoch){
	var myDate = new Date(epoch*1000);
	if (myDate.toLocaleString().split(',')[1].length == 11){
		return(myDate.toLocaleString().split(',')[1].split(' ')[1].slice(0, 4)) + myDate.toLocaleString().split(',')[1].split(' ')[2];	
	}
	else{
		return(myDate.toLocaleString().split(',')[1].split(' ')[1].slice(0, 5)) + myDate.toLocaleString().split(',')[1].split(' ')[2];	
	}
}

handleInputChange(cityName) {
    // this.props.changeCity(input)
	window.localStorage.setItem('cityName', JSON.stringify(cityName))
}


async componentDidMount() {
	if (this.props.cityInput !== null) {
		// console.log(this.props.cityInput)
		await this.setState({ cityName: this.props.cityInput });
		this.forecastAPI();
	}

}

getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null : 
      ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][dayOfWeek];
}

async forecastAPI() {
	const options = {
		method: 'GET',
		url: 'http://localhost:3001/hourlyForecast', //Backend Pull
		params: { city: this.state.cityName },
	}

	let data = await axios.request(options)
	.then(function (response) {
		return response.data;
	})
	.catch(function (error) {
		console.log(error);
	});
	this.setState({ jsonData: data.forecast.forecastday[0].hour.slice(0, 12) })
	this.setState({ jsonData2: data.forecast.forecastday[0].hour.slice(12, 24) })
}


handleSubmit = (e) => {

	e.preventDefault();
	this.forecastAPI();
	this.handleInputChange(this.state.cityName);

}

everyChange = (e) => {

	this.setState({ cityName: e.target.value });
}


render() {
	return (
		<div className='app'>
		<>
		<form className='search' onSubmit={this.handleSubmit}>
			<input onChange={this.everyChange} placeholder="Enter Location"></input>
		</form>

		<div>
		<br></br><br></br><br></br><br></br>
		
		<Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
		{this.state.jsonData && this.state.jsonData.map(data=> {
			return (
				<>
			
				<div className='bottomHour'>
				<p><b className="weatherTime">{this.getTime(data.time_epoch)}</b>
			
				<img src={data.condition.icon}></img>
				{data.temp_c}°C</p>
			
	
				</div>
				
			
				
				</>
				
			);
		})}
		</Row>
		
		<Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
		{this.state.jsonData2 && this.state.jsonData2.map(data2=> {
			return (
				<>
				<Col>
				<div className='bottomHour'>
			
				<p><b className="weatherTime">{this.getTime(data2.time_epoch)}</b>

				
							
				<img src={data2.condition.icon}></img>
				{data2.temp_c}°C</p>
			
				</div>
				
				</Col>
				
				</>
				
			);
		})}
		</Row>
		
		</div>

	</></div>
	);
}
}


export default HourlyForecast;