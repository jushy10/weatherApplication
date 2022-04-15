import React, { Component } from "react";
import axios from "axios";

import { Card, Button } from 'react-bootstrap';
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
	const { jsonData } = this.state;
	return (
	<>
		<form onSubmit={this.handleSubmit}>
		<input onChange={this.everyChange} placeholder="Enter Location"></input>
		</form>

		<div>
		{jsonData && jsonData.map(todo => {
			return (
				<>
				<p> Average Temperature: {todo.day.avgtemp_c}</p>
				<Card style={{ width: '18rem' }}>
					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
						<Card.Title>Card Title</Card.Title>
						<Card.Text>
						Some quick example text to build on the card title and make up the bulk of
						the card's content.
						</Card.Text>
						<Button variant="primary">Go somewhere</Button>
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