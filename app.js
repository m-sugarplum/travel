const express = require('express');
const app = express();
const path = require('path');
const destinationsMexico = require('./mexico-destinations.json');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/destinations-mexico', (req, res) => {
    const destinations = destinationsMexico;
    const listOfPlaces = Object.keys(destinationsMexico);
    const numOfPlaces = listOfPlaces.length;
    // console.log(places.Cancun.img)
    res.render('destinations.ejs', { destinations, listOfPlaces, numOfPlaces });
})

app.get('/destinations-mexico/new', (req, res) => {
    res.render('new.ejs');
})


app.get('/destinations-mexico/:name', (req, res) => {
    const { name } = req.params;
    const data = destinationsMexico[name];
    res.render('details.ejs', { data, name })
})
app.listen(8080, () => {
    console.log("ON PORT 8080!")
})
