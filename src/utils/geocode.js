const request = require('request');
const format = require('string-format');

const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/{0}.json?access_token=pk.eyJ1IjoiYWxsYWh1OTExIiwiYSI6ImNrOGE4NW91NTA5MGszcG82N2E5ZXdmdG0ifQ.yfI30morJMJbub74Humoqg';

const geocode = (address, callback) => {
    let reqURL = format(url, encodeURIComponent(address));
    request(reqURL, { json: true }, (err, response, body) => {
        if (err) callback('No internet access', undefined);
        else if (response.body.features.length === 0) callback('Sorry. We could not find that place', undefined);
        else callback(undefined, {
            name: body.features[0].place_name,
            long: body.features[0].center[0],
            lat: body.features[0].center[1],
        });
    });
};

module.exports = geocode;