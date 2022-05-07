const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const placesMexico = require('./placesMexico.json');

let listOfPlaces = Object.keys(placesMexico);
let numOfPlaces = listOfPlaces.length;

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
    res.render('destinations.ejs', { placesMexico, listOfPlaces, numOfPlaces });
})


app.post('/mexico', (req, res) => {
    res.send("IT WORKED!");
    const dataId = (numOfPlaces + 1).toString();
    placesMexico[dataId] = req.body;
    fs.writeFile('placesMexico.json', JSON.stringify(placesMexico), err => {
        if (err) {
            console.error(err)
            return
        }
    })
    numOfPlaces += 1;
    console.log(placesMexico, numOfPlaces);
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

