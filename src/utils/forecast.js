const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/2d01ce7d7af4293f11d4f8f151eaf3b4/' + long + ',' + lat

    request ( { url, json: true }, (error, { body }) => {
        
        if(error) {
            callback("Unable to connect to weather service.", undefined)
        } else if (body.error) {
            callback("Unable to find location.", undefined)
        } else {
            const { currently, daily } = body
            const { temperature, precipProbability } = currently
            const { summary, temperatureHigh, temperatureLow } = daily.data[0]
            console.log("daily ", daily)
            const forecastString = summary + ", It is currently " + temperature + " degrees out." + " The maximum temperature is " + temperatureHigh + " degrees and the minimum is " + temperatureLow + " degrees. There is a " + precipProbability + "% chance of rain."
            callback(undefined, forecastString)
        }
    })
}

module.exports = forecast
