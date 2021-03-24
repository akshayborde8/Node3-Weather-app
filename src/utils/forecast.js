const request = require("request")
const geocode = require("./geocode.js")


const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=940f9bfe33ccef13a5e932b9df367775&query="+encodeURIComponent(latitude)+","+encodeURIComponent(longitude)+"&units=m"    
    request({url, json: true }, (error, response) => {
        if (error) {
            callback("Please check your connectivity and try again.", undefined)
        } else if (response.body.error) {
            callback("Location not found.", undefined)
        } else {
            callback(undefined , 
                // weather_des : response.body.current.weather_descriptions, 
                // temp : response.body.current.temperature});
                "Today's weather is as follows: \n Weather: "+ response.body.current.weather_descriptions +"\n Temperature: "+ response.body.current.temperature+ " °C. \n Wind Speed: " +response.body.current.wind_speed+ "Km/hr. \n Preciptation: "+ response.body.current.precip+ "%. \n Humidity: "+ response.body.current.humidity+ "%.");
        }
    })
    
}

// forecast(geocode.latitude, geocode.longitude , (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })

module.exports = forecast