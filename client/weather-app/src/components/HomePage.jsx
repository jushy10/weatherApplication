import axios from 'axios'
import React, {Component} from 'react';
import "../styles/city.css"


class HomePage extends Component {
constructor() {
    super();
	this.state = {
        isSubmitted: false
	};
}


handleInputChange(cityName) {
	window.localStorage.setItem('cityName', JSON.stringify(cityName))
}


async componentDidMount() {
	if (this.props.cityInput !== null) {
		await this.setState({ city: this.props.cityInput });
		this.forecastAPI();
	}
    this.setState({isSubmitted: true})

}

async forecastAPI() {
	const options = {
		method: 'GET',
		url: 'http://localhost:3001/cityAPI', //Backend Pull
		params: { city: this.state.city },
	}

	const data = await axios.request(options)
	.then(function (response) {
		return response.data;
	})
	.catch(function (error) {
		console.log(error);
	});

    this.setState({city: data.cityName + ' '});
    this.setState({temp: data.currentTemp + '°C'});
    this.setState({condition: data.condition});
    this.setState({icon: data.icon});
    this.setState({feelsLike: data.feelslike + '°C'});
    this.setState({humidity: data.humidity + '%'});
    this.setState({wind: data.wind + ' km/h'});
    this.setState({country: data.countryName});
}

handleSubmit = (e) => {

    this.setState({isSubmitted: true})
	e.preventDefault();
	this.forecastAPI();
	this.handleInputChange(this.state.city);
    

}

everyChange = (e) => {
	this.setState({ city: e.target.value });
    this.setState({isSubmitted: false})
}


render() {
    return (
      <div className='app'>
            <div className="search">
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.everyChange} placeholder="Enter Location"></input>
                </form>
                {this.state.isSubmitted &&
                <div className='container'>
                    <div className='top'>
                        <div className='location'>
                            <p>{this.state.city} {this.state.country}</p>
                        </div>
                        <div className='temp'>
                            <h1 style={{fontSize: "6rem"}}>{this.state.temp}</h1>
                        </div>
                        <div className='description'>
                            <p>{this.state.condition}</p>
                            <div className='image'>
                                <img src={this.state.icon} alt=''></img>
                            </div>
                        </div>
                    </div>

                    {this.state.feelsLike !== '' && this.state.humidity !== '' && this.state.wind !== '' &&
                    <div className='bottom'>
                        <div className='feels'>
                            <p className='bold'>{this.state.feelsLike}</p>
                            {this.state.feelsLike !== '' &&
                            <p>Feels Like</p>
                            }
                        </div>
                        <div className='humidity'>
                            <p className='bold'>{this.state.humidity}</p>
                            {this.state.humidity !== '' &&
                            <p>Humidity</p>
                            }
                        </div>
                        <div className='wind'>
                            <p className='bold'>{this.state.wind}</p>
                            {this.state.wind !== '' &&
                            <p>Wind Speed</p>
                            }
                        </div>
                    </div>
                    }    
                </div>
                }
            </div>
        </div>   
    );
    }


}

export default HomePage;

