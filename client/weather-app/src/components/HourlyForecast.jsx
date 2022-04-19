import React, { Component } from "react";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Line }            from 'react-chartjs-2'
import axios from "axios";

import { Card, Row, Col, Grid } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/forecast.css"

class HourlyForecast extends Component {
constructor() {
	super();
	this.state = {
	};

	this.tempData = [];

	this.chart = {
		labels: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM'
	, '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
		datasets: [
		{
			fill:false,
			lineTension: 0.5,
			backgroundColor: 'white',
      		borderColor: 'black',
			label: "Temperature",
			data: this.tempData
		}]
	}
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
	this.tempData = []

}

everyChange = (e) => {

	this.setState({ cityName: e.target.value });
	this.tempData = []
}

addTemp(currentTemp){
	this.tempData.push(currentTemp);
}


render() {
	return (
		<div className='app'>
		<>
		<form className='search' onSubmit={this.handleSubmit}>
			<input onChange={this.everyChange} placeholder="Enter Location"></input>
		</form>

		<div>
		<br></br><br></br>
		
		<Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
		{this.state.jsonData && this.state.jsonData.map(data=> {
			return (
				<>
			
				<div className='bottomHour'>
				<p><b className="weatherTime">{this.getTime(data.time_epoch)}</b>
			
				<img src={data.condition.icon}></img>
				{data.temp_c}°C</p>
				{this.addTemp(data.temp_c)}
			
	
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
				{this.addTemp(data2.temp_c)}
				</div>
				
				</Col>
				
				</>
				
			);
		})}
		</Row>
		<br></br><br></br>
		<div className='chartBox'>
		<div style={{ position: "relative", margin: "auto", width: "1250px" }}>
		<Line className="lineChart" data={this.chart} 
		options={
			{title:{ display:true, text:'Daily Temperature'}},
			{scales: {
				y: {  
				  ticks: {
					color: "white", 
					font: {
					  size: 18, 
					},
					stepSize: 1,
					beginAtZero: true
				  }
				},
				x: {  
					ticks: {
					  color: "white", 
					  font: {
						size: 15, 
					  },
					  stepSize: 1,
					}
				  }
			}
			}}
			 />
		</div>
		</div>
		</div>
		

	</></div>
	);
}
}


export default HourlyForecast;