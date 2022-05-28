const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const fs = require('fs');
let placesMexico = require('./placesMexico.json');
let placesMexicoTest = require('./placesMexicoTest.json');

// const res = require('express/lib/response');

let listOfPlaces = Object.keys(placesMexico);
let numOfPlaces = listOfPlaces.length;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));


app.get('/', (req, res) => {
    res.render('home.ejs')
})


app.get('/about', (req, res) => {
    res.render('about.ejs')
})


app.get('/mexico', (req, res) => {
    return res.render('destinations.ejs', {
        placesMexico,
        listOfPlaces,
        numOfPlaces
    });
})


app.post('/', (req, res) => {
    const dataId = (numOfPlaces + 1).toString();
    placesMexico[dataId] = req.body;
    fs.writeFileSync('placesMexico.json', JSON.stringify(placesMexico), err => {
        if (err) {
            console.error(err)
            return
        }
    })
    placesMexico = fs.readFileSync('./placesMexico.json');
    res.render('home.ejs');
})


app.get('/mexico/new', (req, res) => {
    res.render('new.ejs');
})


app.get('/mexico/:id', (req, res) => {
    const { id } = req.params;
    let data = placesMexico[id];
    res.render('details.ejs', { data, id });
})


app.get('/mexico/:id/edit', (req, res) => {
    const { id } = req.params;
    let location = placesMexico[id];
    res.render('update.ejs', { location, id })
})


app.patch('/mexico/:id', (req, res) => {
    const { id } = req.params;
    let data = placesMexico[id];

    let updatedPlaceName = req.body.placeName;
    let updatedCity = req.body.city;
    let updatedState = req.body.state;
    let updatedDescription = req.body.description;
    let updatedImg = req.body.img;

    if (updatedPlaceName.trim() != data.placeName) {
        console.log(`Old place name - ${data.placeName}`);
        data.placeName = updatedPlaceName;
        console.log(`Updated place name - ${data.placeName}`)
    };

    if (updatedCity.trim() != data.city) {
        console.log(`Old city name- ${data.city}`);
        data.city = updatedCity;
        console.log(`Updated city name - ${data.city}`)
    };

    if (updatedState.trim() != data.state) {
        console.log(`Old state name- ${data.state}`);
        data.state = updatedState;
        console.log(`Updated state name - ${data.state}`)
    };

    if (updatedDescription.trim() != data.description) {
        console.log(`Old description - ${data.description}`);
        data.description = updatedDescription;
        console.log(`Updated description - ${data.description}`);
    };

    if (updatedImg != data.imgWide) {
        console.log(`Old img - ${data.imgWide}`);
        data.imgWide = updatedImg;
        console.log(`Updated img - ${data.imgWide}`);
    };

    fs.writeFileSync('placesMexico.json', JSON.stringify(placesMexico), err => {
        if (err) {
            console.error(err)
            return
        }
    })
    placesMexico = fs.readFileSync('./placesMexico.json');

    res.redirect('/mexico');
})


app.listen(8080, () => {
    console.log("ON PORT 8080!")
})

