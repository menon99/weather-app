const request = require('request');
const format = require('string-format');

const url = 'https://api.darksky.net/forecast/bc9c006360b0d8b11e26f5d05c301c75/{0},{1}?exclude=[hourly,minutely,alerts,flags]&units=si';

const getWeather = (longitude, latitude, callback) => {
    let reqUrl = format(url, latitude, longitude);
    request(reqUrl, { json: true }, (err, response, body) => {
        if (err) callback('No internet access', undefined);
        else if ('error' in response.body) callback('No such place oops', undefined);
        else callback(undefined, { body });
    });
};

module.exports = getWeather;