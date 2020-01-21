
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prakash Selvaraju'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name:'Prakash Selvaraju'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Prakash Selvaraju',
        content: 'You have visited Help page!'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) { return res.send ({ error }) }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) { return res.send ({ error }) }
            return res.send ({
                address: req.query.address,
                location,
                forecastData: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('error', {
        title: 'Error!!!',
        errorMessage: 'Help Article Not Found!',
        name: 'Prakash Selvaraju',
    })
})

app.get('*', (req, res) => {
    //res.send('Oops! 404 Page')
    res.render('error', {
        title: 'Error!!!',
        errorMessage: 'Page Not Found!',
        name: 'Prakash Selvaraju',

    })
})

app.listen(3000, () => {
    console.log("Server started in port 3000")
})
