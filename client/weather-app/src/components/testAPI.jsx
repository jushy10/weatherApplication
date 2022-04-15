import React, { Component } from "react";
import axios from "axios";

class Usingdidmount extends Component {
constructor() {
	super();
	this.state = {
	};
}


async newAPI() {
	let data = await axios.get("http://api.weatherapi.com/v1/forecast.json?key=d5ccf290643547b2aa3190009220604&q=" + this.state.cityName + "&days=7&aqi=no&alerts=no")
	.then(function (response) {
		return response.data;
	})
	.catch(function (error) {
		console.log(error);
	});
	this.setState({ test: data.forecast.forecastday });
}

handleSubmit = (e) => {

	e.preventDefault();

	this.newAPI();

}

everyChange = (e) => {

	this.setState({ cityName: e.target.value });
}


render() {
	const { test } = this.state;
	return (
	<>
		<form onSubmit={this.handleSubmit}>
		<input onChange={this.everyChange} placeholder="Enter Location"></input>
		</form>

		<div>
		{test && test.map(todo => {
			return (
			<p> Average Temperature: {todo.day.avgtemp_c}</p>
			);
		})}
		</div>

	</>
	);
}
}

export default Usingdidmount;