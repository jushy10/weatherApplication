import React, { Component } from "react";
import axios from "axios";

import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

class ForecastAPI extends Component {
constructor() {
	super();
	this.state = {
	};
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
		{this.state.jsonData && this.state.jsonData.map(data => {
			return (
				<>
				<Card style={{ width: '18rem', display: 'flex', flexDirection: 'row' }}>
					<Card.Img variant="top" src={data.day.condition.icon} />
					<Card.Body>
						<Card.Title>{data.date}</Card.Title>
						<Card.Text>Average Temp: {data.day.avgtemp_c}</Card.Text>
						<Card.Text>Average Temp: {data.day.avgtemp_c}</Card.Text>
					</Card.Body>
				</Card>
				
				</>

			);
		})}
		</div>

	</>
	);
}
}

export default ForecastAPI;