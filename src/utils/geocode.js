const request = require('request')



const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicHJha2FzaHNlbHZhIiwiYSI6ImNrNTk0ajB1cjBsangzbm03c29jY2EzZnIifQ.r10G0rardSCzp8MCNvoXWQ&limit=1'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            const { center, place_name } = body.features[0]

            callback(undefined, {
                latitude: center[0],
                longitude: center[1],
                location: place_name
            })
        }
    })
}

module.exports = geocode
