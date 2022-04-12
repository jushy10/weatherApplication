const fetch = require("node-fetch");

// http://api.weatherapi.com/v1/current.json?key=d5ccf290643547b2aa3190009220604&q=Toronto&aqi=yes
// exports.currentAPI = async (req, res) => {
//     try {
//         const url = `http://api.weatherapi.com/v1/current.json?key=d5ccf290643547b2aa3190009220604&q=Toronto&aqi=yes`;

//     const response = await fetch(url, {
//         method: 'GET',
//         mode: 'cors',
//         headers: { 'Content-Type': 'application/json' }
//     });

//         const data = await response.json();
//         // res.send(data.location.name);
//         res.send(
//             JSON.stringify({
//               firstName: "John",
//               lastName: "Doe"
//             })
//         );
//     } 
    
//     catch (err) {
//         console.error(err.message);
//         res.status(500).send('server error');
//     }

// }

exports.testJSON = async (req, res) => {

    const url = `http://api.weatherapi.com/v1/current.json?key=d5ccf290643547b2aa3190009220604&q=Toronto&aqi=yes`;

    const response = await fetch(url);
    const data = await response.json();

    res.setHeader('Content-Type', 'application/json');

    res.end(
      JSON.stringify({
        cityName: data.location.name,
        currentTemp: data.current.temp_c,
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        icon: data.current.condition.icon,
        feelslike: data.current.feelslike_c,
        wind: data.current.wind_kph,
      })
    );
  };