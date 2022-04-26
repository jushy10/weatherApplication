const express = require('express')
app = express()
const cors = require('cors')

app.use(cors()) 

require('dotenv').config()

app.use('/api/', require('./routes/routes.js'))

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const axios = require('axios')

const { MongoClient } = require('mongodb');



//Database Information for Connection
const uri = 'mongodb+srv://jushy:Password123@cluster0.eaqyv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const client = new MongoClient(uri);


//Func to connect to database
async function main() {
    try {
        await client.connect();
        console.log("Successfully Connected To MongoDB");
    }
    catch (e) {
        console.error(e);
    }

}

main().catch(console.error);


//Func to create listing if newListing is unique
async function createListing (newListing) {
    //Iterate through all current listings
    checkIfDuplicate = false;
    await client.db("CityInputs").collection("cities").find().limit(11).sort( {$natural:-1} ).forEach(
        function(index) {

            listing = newListing.city
            index = index.city

            if (listing.toLowerCase() === index.toLowerCase()) {
                // console.log("Duplicate found");
                checkIfDuplicate = true;
            }        
    });
    //If there is no duplicate, then insert into db
    if (checkIfDuplicate === false) {
        const result = await client.db("CityInputs").collection("cities").insertOne(newListing);
        console.log(`New Listing Created: ${result.insertedId}`);
    }

}


//historyPage API Call
app.get('/history', (req, res) => {
    var arr = [];
    var itemsProcessed = 0;
    //Iterate through 10 most recent inputs
    const cursor = client.db("CityInputs").collection("cities").find().limit(11).sort( {$natural:-1} )
    cursor.forEach(
        function(index) {
            arr.push(index.city)
            itemsProcessed++;
            if (itemsProcessed === 11) {
                afterCursor();
            }
        });
    //Send Data to Front End
    function afterCursor() {
        res.json(arr)
        res.end();

    }
})


//homepage API Call
app.get('/cityAPI', (req, res) => {
    const passedCity = req.query.city;
    const options = {
        method: 'GET',
        url: 'http://api.weatherapi.com/v1/current.json?key=d5ccf290643547b2aa3190009220604&q=' + passedCity + '&aqi=yes',
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
                region: response.data.location.region,
            })
            )

    }).catch((error) => {
        console.error(error)
    })

    createListing({
        city: passedCity,
    })
})


//3d Forecast API Call
app.get('/forecastAPI', (req, res) => {
    const passedCity = req.query.city;
    const options = {
        method: 'GET',
        url: 'http://api.weatherapi.com/v1/forecast.json?key=d5ccf290643547b2aa3190009220604&q=' + passedCity + '&days=7&aqi=no&alerts=no',
    }

    axios.request(options).then((response) => {
        res.json(response.data)
        res.end();

    }).catch((error) => {
        console.error(error)
    })

    createListing({
        city: passedCity,
    })
})


//Hourly Forecast API Call
app.get('/hourlyForecast', (req, res) => {
    const passedCity = req.query.city;
    const options = {
        method: 'GET',
        url: 'http://api.weatherapi.com/v1/forecast.json?key=d5ccf290643547b2aa3190009220604&q=' + passedCity + '&days=1&aqi=no&alerts=no',
    }

    axios.request(options).then((response) => {
        res.json(response.data)
        res.end();

    }).catch((error) => {
        console.error(error)
    })

    createListing({
        city: passedCity,
    })
})


const PORT = 3001

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})