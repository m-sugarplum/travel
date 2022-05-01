const express = require('express');
const app = express();
const path = require('path');
const destinationsMexico = require('./mexico-destinations.json');
const destinations = destinationsMexico;
const listOfPlaces = Object.keys(destinationsMexico);
const numOfPlaces = listOfPlaces.length;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('home.ejs')
    console.log()
})


app.get('/mexico', (req, res) => {
    const destinations = destinationsMexico;
    const listOfPlaces = Object.keys(destinationsMexico);
    const numOfPlaces = listOfPlaces.length;
    // console.log(places.Cancun.img)
    res.render('destinations.ejs', { destinations, listOfPlaces, numOfPlaces });
})


app.post('/mexico', (req, res) => {
    res.send("IT WORKED!");
    // const { placeName, city, state, description, image } = req.body;
    const dataId = (numOfPlaces + 1).toString();
    let placeToAdd = {};
    placeToAdd[dataId] = req.body;

    let mergedObject = Object.assign(destinations, placeToAdd);
    // zamien JSONa mexico-destination na obiekt (mergedObject) i na nim dalej pracuj
    console.log(mergedObject)
})


app.get('/mexico/new', (req, res) => {
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

