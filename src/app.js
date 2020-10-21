const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// define paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

// setup handle bar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)

// setup the static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rehman Niaz'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rehman Niaz'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name:'Rehman Niaz'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'please provide address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}={}) =>{
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error , forecastData) =>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })

        })

    })

    
})
app.get('/products', (req, res) => {
    if(!req.query.products){
        return res.send({
            error:'You must provide a search term!'
        })

    }
    console.log(req.query.products)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res) =>{
    res.render('404-page',{
        title: '404',
        name: 'Rehman Niaz',
        unableFindpage:'Help article is not found!!!'
    })
})
app.get('*',(req,res) =>{
    res.render('404-page',{
        title: '404',
        name: 'Rehman Niaz',
        unableFindpage:'Error 404 page not found!!!'
    })
})
app.listen(port, () => {
    console.log('Server is up on port.'+ port)
})