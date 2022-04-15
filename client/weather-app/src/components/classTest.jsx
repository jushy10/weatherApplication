import React from "react";
import axios from 'axios'

export default class ForecastTest extends React.Component {
    constructor() {
        super();

        this.state = {
            cityInput: '',
        };
        this.getAPI = this.getAPI.bind(this);
    }

    componentDidMount() {
        this.getAPI();
    }


    async getAPI() {
        const options = {
            method: 'GET',
            url: 'http://localhost:3001/forecastAPI', //Backend Pull
            // params: { city: this.state.cityInput },
            params: { city: "Toronto" },
        }

        let data = await axios.request(options)
        .then((response) => {
            return response;
            // for (let i = 0; i < 3; i++) {
            //     console.log(response.data.forecast[i]);
                
            //     // setMaxTemp(response.data.forecast[0].day.maxtemp_c)
            //     // setMinTemp(response.data.forecast[0].day.mintemp_c)
            //     // setAvgTemp(response.data.forecast[0].day.avgtemp_c)
            //     // setCondition(response.data.forecast[0].day.condition.text)
            //     // setConditionIcon(response.data.forecast[0].day.condition.icon)
            //     // setChanceOfRain(response.data.forecast[0].day.daily_chance_of_rain)

            // }
            

        }).catch((error) => {
            console.error(error)
        })
        this.setState({ todos: data.data });
    }



    handleSubmit = (e) => {

        e.preventDefault();

        this.getAPI();
    }

    everyChange = (e) => {

        //Setting cityInput
        this.setState({ cityInput: e.target.value })
    }

    render() {
        const { todos } = this.state;

        return (
            // <>
            // <form onSubmit={this.handleSubmit}>
            //     <input onChange={this.everyChange} placeholder="Enter Location"></input>
            // </form>

            <div>
                <h3>Using componentDidMount for initial data render</h3>
                <hr />
                {todos}
            </div>

            // </>
        )



    }




}