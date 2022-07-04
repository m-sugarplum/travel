const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const mysql = require('mysql');
const password = require('./dbSettings');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'mexico'
});


const fs = require('fs');
// placesMexico.json saves all the information about destinations to visit - later will be replaced by a database
let placesMexico = require('./placesMexico.json');
// let placesMexicoTest = require('./placesMexicoTest.json');

let listOfPlaces = Object.keys(placesMexico);
let numOfPlaces = listOfPlaces.length;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// methodOverride - to create PATCH and DELETE requests
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));


app.get('/', (req, res) => {
    // rendering Home page
    res.render('home.ejs')
})


app.get('/about', (req, res) => {
    // rendering About Me page
    res.render('about.ejs')
})


app.get('/mexico', (req, res) => {
    // rendering page with a list of all destinations to visit in Mexico - show page with square pictures and names of places
    const allPlacesQuery = "SELECT id, place_name, img FROM places ORDER BY id;";
    // mexico DB > places
    connection.query(allPlacesQuery, function (error, results) {
        if (error) throw error;
        const allPlaces = results;
        const placesCount = allPlaces.length;
        res.render("destinations.ejs", { allPlaces, placesCount })
    });
})


app.post('/', (req, res) => {
    // data from new.ejs form is added to places table (mexico DB) > redirect to /mexico
    const placeName = req.body.placeName;
    const city = req.body.city;
    const state = req.body.state;
    const description = req.body.description;
    const imgWide = req.body.imgWide;
    const imgSquare = req.body.img;
    const insertPlaceQuery = `INSERT INTO places(place_name, city, state_id, place_description, img, img_wide) VALUES ("${placeName}", "${city}", ${state}, "${description}", "${imgSquare}", "${imgWide}");`;
    connection.query(insertPlaceQuery, function (error) {
        if (error) throw error;
        res.redirect('/mexico');
    });
})


app.get('/mexico/new', (req, res) => {
    // rendering form to add a new destination - after clicking Add New Place button on /mexico
    res.render('new.ejs');
})


app.get('/mexico/:id', (req, res) => {
    // rendering details page showing place name, city, state, description and a wide picture
    const place_id = req.params.id;
    const placeQuery = `
    SELECT place_name, city, state_name, place_description, img_wide 
    FROM places 
    JOIN states ON places.state_id = states.id 
    WHERE places.id=${place_id};`;
    connection.query(placeQuery, function (error, results) {
        if (error) throw error;
        const place = results[0];
        res.render("details.ejs", { place, place_id });
    });
})


app.get('/mexico/:id/edit', (req, res) => {
    // rendering pepopulated form to edit the destination (Images URL must already exist in /public/photos folder)
    const place_id = req.params.id;
    const placeQuery = `
    SELECT place_name, city, state_name, place_description, img_wide, img 
    FROM places 
    JOIN states ON places.state_id = states.id 
    WHERE places.id=${place_id};`;
    connection.query(placeQuery, function (error, results) {
        if (error) throw error;
        const place = results[0];
        res.render("update.ejs", { place, place_id });
    });
})


app.patch('/mexico/:id', (req, res) => {
    // updating information about given place in DB and redirecting to /mexico
    const place_id = req.params.id;
    let updatedPlaceName = req.body.placeName.trim();
    let updatedCity = req.body.city.trim();
    let updatedState = req.body.state;
    let updatedDescription = req.body.description.trim();
    let updatedImg = req.body.imgWide.trim();
    let updatedSquareImg = req.body.img.trim();
    const updatePlaceQuery = `UPDATE places SET place_name="${updatedPlaceName}", city="${updatedCity}", state_id=${updatedState}, place_description="${updatedDescription}", img="${updatedSquareImg}", img_wide="${updatedImg}" WHERE id=${place_id};`;
    connection.query(updatePlaceQuery, function (error) {
        if (error) throw error;
        res.redirect('/mexico');
    })
})


app.delete('/mexico/:id', (req, res) => {
    // deleting destination from JSON and redirecting to /mexico
    const { id } = req.params;
    console.log(placesMexico[id])
    delete placesMexico[id];
    console.log(placesMexico[id])
    fs.writeFileSync('placesMexico.json', JSON.stringify(placesMexico), err => {
        if (err) {
            console.error(err)
            return
        }
    })
    placesMexico = fs.readFileSync('./placesMexico.json');
    res.redirect('/mexico')
})

app.listen(8080, () => {
    console.log("Travel app on port 8080!")
})