const request = require("request")

const geocode = (city , callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(city) +".json?access_token=pk.eyJ1IjoiYWtzaGF5Ym9yZGU4IiwiYSI6ImNrbWVzdG56MTJ5aG0yb253MnE0Ym9ma28ifQ.-Slf-XvDnrsAlVPxMSFMyw&limit=1"  
    request({url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to location service", undefined)
        } else if (response.body.features.length === 0) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, {
               latitude : response.body.features[0].center[1],
               longitude : response.body.features[0].center[0],
               location : response.body.features[0].place_name
            });

        }

    })
}

// geocode("Mumbai" , (error, data) => {
//     console.log("error", error);
//     console.log("data",data);

// });

module.exports = geocode