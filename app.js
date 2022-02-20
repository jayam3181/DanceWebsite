const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const port = 80
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/querydance', { useNewUrlParser: true })

// CREATING A SCHEMA
const queryschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
})
const query = mongoose.model('query', queryschema)

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))  // For serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') //Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))   //Set the views directory

//ENDPOINTS
//Our pug demo endpoint
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params)
})
app.get('/contact', (req, res) => {
    // const params = {}
    res.status(200).render('contact.pug')
})
app.post('/contact', (req, res) => {
    var mydata= new query(req.body)
    mydata.save().then(()=>{
        // res.send('The item has been saved to the database.')
        res.render('home.pug')
    }) .catch(()=>{
        res.status(404).send('The item has not saved to the database.')
    })
})
//START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})