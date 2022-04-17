const express = require('express'),
app = express()
var cors = require('cors')

app.use(cors()) 

require('dotenv').config()

app.use('/api/', require('./routes/routes.js'))

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const axios = require('axios')


//add new user
app.post('/store-data', (req, res) => {
    let data = res.json();
    // let sql = "INSERT INTO users SET ?";
    // let query = conn.query(sql, data,(err, results) => {
    //   if(err) throw err;
    //   res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    // });
    console.log(data);
});

app.get('/cityAPI', (req, res) => {
    const passedCity = req.query.city;
    const options = {
        method: 'GET',
        url: 'http://api.weatherapi.com/v1/current.json?key=d5ccf290643547b2aa3190009220604&q=' + passedCity + '&aqi=yes',
        // params: {level: 'Toronto', area: 'sat'},
        headers: {
            // 'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
            // 'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    }

    axios.request(options).then((response) => {
        res.end (
            JSON.stringify({
                cityName: response.data.location.name,
                countryName: response.data.location.country,
                currentTemp: response.data.current.temp_c,
                condition: response.data.current.condition.text,
                humidity: response.data.current.humidity,
                icon: response.data.current.condition.icon,
                feelslike: response.data.current.feelslike_c,
                wind: response.data.current.wind_kph,
            })
            )

    }).catch((error) => {
        console.error(error)
    })
})


app.get('/forecastAPI', (req, res) => {
    const passedCity = req.query.city;
    const options = {
        method: 'GET',
        url: 'http://api.weatherapi.com/v1/forecast.json?key=d5ccf290643547b2aa3190009220604&q=' + passedCity + '&days=7&aqi=no&alerts=no',
        // params: {level: 'Toronto', area: 'sat'},
        headers: {
            // 'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
            // 'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    }

    axios.request(options).then((response) => {
        res.json(response.data)
        res.end();

    }).catch((error) => {
        console.error(error)
    })
})

app.get('/hourlyForecast', (req, res) => {
    const passedCity = req.query.city;
    const options = {
        method: 'GET',
        url: 'http://api.weatherapi.com/v1/forecast.json?key=d5ccf290643547b2aa3190009220604&q=' + passedCity + '&days=1&aqi=no&alerts=no',
        // params: {level: 'Toronto', area: 'sat'},
        headers: {
            // 'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
            // 'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    }

    axios.request(options).then((response) => {
        res.json(response.data)
        res.end();

    }).catch((error) => {
        console.error(error)
    })
})







const PORT = 3001

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})