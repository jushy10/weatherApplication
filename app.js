const express = require('express'),
app = express()
var cors = require('cors')

app.use(cors()) 

require('dotenv').config()

app.use('/api/', require('./routes/routes.js'))

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const axios = require('axios')

const { MongoClient, Collection } = require('mongodb');


const uri = 'mongodb+srv://jushy:Password123@cluster0.eaqyv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const client = new MongoClient(uri);


async function main() {
    // const uri = 'mongodb+srv://jushy:Password123@cluster0.eaqyv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

    // const client = new MongoClient(uri);


    try {
        await client.connect();
        console.log("Successfully Connected To MongoDB");

        // await listDatabases(client);

        // await createListing(client, {
        //     city: "New York",
        // })
    }
    catch (e) {
        console.error(e);
    }
    // finally {
    //     await client.close();
    // }
}

main().catch(console.error);



// async function listDatabases (client) {
//     const databaseList = await client.db().admin().listDatabases();
//     // console.log(databaseList);
//     console.log("Databases:");
//     databaseList.databases.forEach(db => {
//         console.log(` - ${db.name}`);
//     })
// }




async function createListing (client, newListing) {
    //Iterate through all current listings
    checkIfDuplicate = false;
    await client.db("CityInputs").collection("cities").find().forEach(
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
                region: response.data.location.region,
            })
            )

    }).catch((error) => {
        console.error(error)
    })

    createListing(client, {
        city: passedCity,
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

    createListing(client, {
        city: passedCity,
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

    createListing(client, {
        city: passedCity,
    })
})







const PORT = 3001

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})