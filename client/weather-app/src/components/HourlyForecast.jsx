import React, { Component } from "react";
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import axios from "axios";

import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/forecast.css"

class HourlyForecast extends Component {
constructor() {
	super();
	this.state = {
		hourlyChart: {
			labels: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM'
			, '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
			datasets: [
			{
				fill: false,
				lineTension: 0.5,
				backgroundColor: 'white',
				borderColor: 'black',
				label: "Temperature",
				data: [],
			}]
		},
		humidityChart: {
			labels: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM'
			, '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
			datasets: [
			{
				fill: false,
				lineTension: 0.5,
				backgroundColor: 'white',
				borderColor: 'black',
				label: "Humidity",
				data: [],
			}]
		},
		chanceOfRainChart: {
			labels: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM'
			, '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
			datasets: [
			{
				fill: false,
				lineTension: 0.5,
				backgroundColor: 'white',
				borderColor: 'black',
				label: "Chance of Rain",
				data: [],
			}]
		},
		isSubmitted: false,
	};

}

getTime(epoch){
	var myDate = new Date(epoch*1000);
	if (myDate.toLocaleString().split(',')[1].length === 11){
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
		await this.setState({ cityName: this.props.cityInput });
		this.forecastAPI();
	}
	this.setState({isSubmitted: true})

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

	let datas = await axios.request(options)
	.then(function (response) {
		return response.data;
	})
	.catch(function (error) {
		console.log(error);
	});



	//Cards
	this.setState({ jsonData: datas.forecast.forecastday[0].hour.slice(0, 12) })
	this.setState({ jsonData2: datas.forecast.forecastday[0].hour.slice(12, 24) })


	//Graph
	if (datas) {
		datas.forecast.forecastday[0].hour.map(info => 
			this.state.hourlyChart.datasets[0].data.push(info.temp_c) 
		);
		datas.forecast.forecastday[0].hour.map(info => 
			this.state.humidityChart.datasets[0].data.push(info.humidity)				
		);
		datas.forecast.forecastday[0].hour.map(info => 
			this.state.chanceOfRainChart.datasets[0].data.push(info.chance_of_rain)				
		);
	}
	this.setState({ country: datas.location.country})
	this.setState({ region: datas.location.region})
	this.setState({ cities: datas.location.name})



}


//Enter Key
handleSubmit = (e) => {
	this.setState({isSubmitted: true})

	this.setState({
		hourlyChart: {
			labels: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM'
			, '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
			datasets: [
			{
				fill: false,
				lineTension: 0.5,
				backgroundColor: 'white',
				borderColor: 'black',
				label: "Temperature",
				data: [],
			}]
	}});

	this.setState({
		humidityChart: {
			labels: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM'
			, '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
			datasets: [
			{
				fill: false,
				lineTension: 0.5,
				backgroundColor: 'white',
				borderColor: 'black',
				label: "Humidity",
				data: [],
			}]
	}});

	this.setState({
		chanceOfRainChart: {
			labels: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM'
			, '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
			datasets: [
			{
				fill: false,
				lineTension: 0.5,
				backgroundColor: 'white',
				borderColor: 'black',
				label: "Chance of Rain",
				data: [],
			}]
	}});

	e.preventDefault();
	this.forecastAPI();
	this.handleInputChange(this.state.cityName);
	
}

everyChange = (e) => {
	this.setState({ cityName: e.target.value });
	this.setState({isSubmitted: false})
}


render() {
	return (
		<div className='app2'>
		<>
		<form className='search' onSubmit={this.handleSubmit}>
			<input onChange={this.everyChange} placeholder="Enter Location"></input>
		</form>

		<div>

		{this.state.isSubmitted &&
		<>
		<h2 className="cityname"><center> {this.state.cities} {this.state.region}, {this.state.country}</center></h2>
		</>
		}
		<center>All Times Relative to EST</center>
		<br></br><br></br>

		
		<Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
		{this.state.jsonData && this.state.jsonData.map(data=> {
			return (
				<>
			
				<div className='bottomHour'>
				<p><b className="weatherTime">{this.getTime(data.time_epoch)}</b>
			
				<img alt="" src={data.condition.icon}></img>
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

				
							
				<img alt="" src={data2.condition.icon}></img>
				{data2.temp_c}°C</p>
				</div>
				
				</Col>
				
				</>
				
			);
		})}
		</Row>
		<br></br><br></br>

		<div className='chartBox'>
		<div style={{ position: "relative", margin: "auto", width: "1250px" }}>

		<h1>Hourly Temperature</h1>
		<Line className="lineChart" data={this.state.hourlyChart} 
			options={
			{scales: {
				y: {  
				  ticks: {
					color: "white", 
					font: {
					  size: 18, 
					},
					stepSize: 1,
					beginAtZero: true,
					callback: function(value) {
                        return value + "°C"
					}
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
			}
		}
			 />



			 
		</div>
		</div>

		<div className='chartBox'>
		<div style={{ position: "relative", margin: "auto", width: "1250px" }}>
		
		<h1>Hourly Humidity Levels</h1>
		<br></br>
		<Line className="lineChart" data={this.state.humidityChart} 
			options={
			{scales: {
				y: {  
					suggestedMin: 0,
                	suggestedMax: 100,
				  ticks: {
					color: "white", 
					font: {
					  size: 18, 
					},
					stepSize: 1,
					beginAtZero: true,
					callback: function(value) {
                        return value + "%"
					}
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
			}
		}
			 />
			 </div>

		</div>

		<div className='chartBox'>
		<div style={{ position: "relative", margin: "auto", width: "1250px" }}>
		
		<h1>Hourly Chance of Rain</h1>
		<br></br>
		<Line className="lineChart" data={this.state.chanceOfRainChart} 
			options={
			{scales: {
				y: {  
					suggestedMin: 0,
                	suggestedMax: 100,
				  ticks: {
					color: "white", 
					font: {
					  size: 18, 
					},
					stepSize: 1,
					beginAtZero: true,
					callback: function(value) {
                        return value + "%"
					}
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
			}
		}
			 />
			 </div>

		</div>
		</div>
		

	</></div>
	);
}
}


export default HourlyForecast;