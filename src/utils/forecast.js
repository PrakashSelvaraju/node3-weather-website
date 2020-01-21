const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/2d01ce7d7af4293f11d4f8f151eaf3b4/' + long + ',' + lat

    request ( { url, json: true }, (error, { body }) => {
        
        if(error) {
            callback("Unable to connect to weather service.", undefined)
        } else if (body.error) {
            //console.log(response)
            callback("Unable to find location.", undefined)
        } else {
            const { currently, daily } = body
            const { temperature, precipProbability } = currently
            const { summary } = daily.data[0]
            const forecastString = summary + ", It is currently " + temperature + " degrees out. There is a " + precipProbability + "% chance of rain."
            // callback(undefined, {
            //     summary: daily[0].summary,
            //     temperature: currently.temperature,
            //     precipProbability: currently.precipProbability,                  
            // })
            callback(undefined, forecastString)
        }
    })
}

module.exports = forecast
