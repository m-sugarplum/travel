const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
let placesMexico = require('./placesMexico.json');
const res = require('express/lib/response');

let listOfPlaces = Object.keys(placesMexico);
let numOfPlaces = listOfPlaces.length;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));


app.get('/', (req, res) => {
    res.render('home.ejs')
})


app.get('/about', (req, res) => {
    res.render('about.ejs')
})


app.get('/mexico', (req, res) => {
    res.render('destinations.ejs', {
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
    let data = placesMexico[id];
    let description = data.description;
    let placeName = data.placeName;
    let city = data.city;
    let state = data.state;
    let img = data.imgWide;
    console.log(id)

    res.render('update.ejs', { description, placeName, city, state, img, id })
})
// app.patch('/mexico/:id', (req, res) => {
//     const { id } = req.params;
//     let data = placesMexico[id];
//     let description = data.description;
//     const updatedDescription = req.body.description;
//     description = updatedDescription;
//     res.redirect('/mexico');
// })


app.listen(8080, () => {
    console.log("ON PORT 8080!")
})

