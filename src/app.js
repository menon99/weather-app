const express = require('express');
const path = require('path');
const hbs = require('hbs');
const getWeather = require('./utils/weather');
const geocode = require('./utils/geocode');

const publicPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../partials');
const app = express();

const port = process.env.PORT || 8000;

//handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

//static directory path
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akash Menon',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address not provided'
        });
    }
    geocode(req.query.address, (error, { name, lat, long } = {}) => {
        if (error) {
            return res.send({ error });
        } else {
            getWeather(long, lat, (err, response) => {
                if (err) return res.send({ error });
                else {
                    let body = response.body;
                    return res.send({
                        name,
                        summary: body.daily.summary,
                        temperature: body.currently.temperature,
                        today: {
                            summary: body.daily.data[0].summary,
                            temperatureHigh: body.daily.data[0].temperatureHigh,
                            temperatureLow: body.daily.data[0].temperatureLow,
                        }
                    });
                }
            });
        }
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akash Menon',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Akash Menon',
        helpText: 'Type your location in search bar to get weather details',
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: "Oops can't find that page",
        msg: req.url + ' not found',
        name: 'Akash Menon',
    });
});

app.listen(port, () => {
    console.log('Server running');
});