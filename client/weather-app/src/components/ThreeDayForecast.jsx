import React, { Component } from "react";
import axios from "axios";

import { Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/forecast.css"

class ThreeDayForecast extends Component {
constructor() {
	super();
	this.state = {
	};
}

getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null : 
      ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][dayOfWeek];
}

async forecastAPI() {
	const options = {
		method: 'GET',
		url: 'http://localhost:3001/forecastAPI', //Backend Pull
		params: { city: this.state.cityName },
	}

	let data = await axios.request(options)
	.then(function (response) {
		return response.data;
	})
	.catch(function (error) {
		console.log(error);
	});
	this.setState({ jsonData: data.forecast.forecastday });
}

handleSubmit = (e) => {

	e.preventDefault();
	this.forecastAPI();

}

everyChange = (e) => {

	this.setState({ cityName: e.target.value });
}


render() {
	return (
		<>
		<form onSubmit={this.handleSubmit}>
			<input onChange={this.everyChange} placeholder="Enter Location"></input>
		</form>

		<div>
		<br></br><br></br><br></br>	
		<Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
		{this.state.jsonData && this.state.jsonData.map(data => {
			
			return (
				<>
				&emsp;&emsp;
				<Col>
				
				<Card border="success" class="weatherCard" bg='dark' text='light' style={{ width: '25rem', display: 'flex', flexDirection: 'column'}}>
					<Card.Img class="weatherIcon" variant="top" src={data.day.condition.icon} />
					<Card.Body>
						<Card.Title class="cardTitle">{this.getDayOfWeek(data.date)}</Card.Title>
						<Card.Text class="cardText">Average Temp: {data.day.avgtemp_c}</Card.Text>
						<Card.Text class="cardText">Chance of Rain: {data.day.daily_chance_of_rain}% </Card.Text>

					</Card.Body>
				</Card>
				</Col>
				</>

			);
			
		})}
		</Row>
		</div>

	</>
	);
}
}

export default ThreeDayForecast;