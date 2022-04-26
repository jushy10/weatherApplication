import axios from 'axios'
import React, {Component} from 'react';
import "../styles/homepage.css"


class HomePage extends Component {
constructor() {
    super();
	this.state = {
        isSubmitted: false
	};
    
}


handleInputChange(cityName) {
    //Set input to session storage of browser
	sessionStorage.setItem('cityName', JSON.stringify(cityName))
}


async componentDidMount() {
    //Checks if there is a current input in local storage
	if (this.props.cityInput !== null) {
        //If there is set it to a prop
		await this.setState({ city: this.props.cityInput });
        //API Call
		this.forecastAPI();
	}
    this.setState({isSubmitted: true})

}

async forecastAPI() {
	const options = {
		method: 'GET',
        
		url: 'http://localhost:3001/cityAPI', //Backend Call
		params: { city: this.state.city },
	}

	const data = await axios.request(options)
	.then(function (response) {
		return response.data;
	})
	.catch(function (error) {
		console.log(error);
	});
    //Setting states for json info
    this.setState({city: data.cityName + ' '});
    this.setState({temp: data.currentTemp + '°C'});
    this.setState({condition: data.condition});
    this.setState({icon: data.icon});
    this.setState({feelsLike: data.feelslike + '°C'});
    this.setState({humidity: data.humidity + '%'});
    this.setState({wind: data.wind + ' km/h'});
    this.setState({country: data.countryName});
    this.setState({region: data.region});
}

//Submission of search bar
handleSubmit = (e) => {
    //Regex for Search bar
    const regex = new RegExp(`^[a-zA-Z\\s]+$`);
	e.preventDefault();
    if (regex.test(this.state.city)) {


        this.setState({isSubmitted: true})
        this.forecastAPI();
        this.handleInputChange(this.state.city);
    }
    else {
        alert("Input Incorrect \nEx: Toronto");
		sessionStorage.clear();
    }
    
}


//Every change in the search bar
everyChange = (e) => {
    //Saving input down from user
    
	this.setState({ city: e.target.value });
    this.setState({isSubmitted: false})
}


render() {
    return (
      <div className='homepage'>
            <div className="search_homepage">
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.everyChange} placeholder="Enter Location"></input>
                </form>
                {this.state.isSubmitted && this.state.city !== '' &&
                <div className='container_homepage'>
                    <div className='top'>
                        <div className='location'>
                            <p>{this.state.city} {this.state.region}, {this.state.country}</p>
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

