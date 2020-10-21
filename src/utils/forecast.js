const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=26e3343d0d104ebddbe7213c4561bb1e&query='+latitude+','+longitude+'&units=f'
    //const url ='http://api.weatherstack.com/current?access_key=26e3343d0d104ebddbe7213c4561bb1e&query=37.8267,-122.4233&units=f'

        
    request({ url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' +body.current.temperature + ' degress out. It is feels like ' +body.current.feelslike+ 'The humidity is '+body.current.humidity)
        }
    })
}

module.exports = forecast