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
    connection.query(allPlacesQuery, function (error, results, fields) {
        if (error) throw error;
        const allPlaces = results;
        const placesCount = allPlaces.length;
        res.render("destinations.ejs", { allPlaces, placesCount })
    });
});


app.post('/', (req, res) => {
    // data from new.ejs form allows to change placesMexico.json - new destinations is added to the file with consecutive id number (key)
    const dataId = (numOfPlaces + 1).toString();
    placesMexico[dataId] = req.body;
    fs.writeFileSync('placesMexico.json', JSON.stringify(placesMexico), err => {
        if (err) {
            console.error(err)
            return
        }
    })
    placesMexico = fs.readFileSync('./placesMexico.json');
    res.redirect('/mexico');
})


app.get('/mexico/new', (req, res) => {
    // rendering form to add new destination - after clicking Add New Place button on /mexico
    res.render('new.ejs');
})


app.get('/mexico/:id', (req, res) => {
    // rendering details page showing place name, city, state, description and wide picture
    const place_id = req.params.id;
    // console.log(place_id);
    const placeQuery = `
    SELECT place_name, city, state_name, place_description, img_wide 
    FROM places 
    JOIN states ON places.state_id = states.id 
    WHERE places.id=${place_id};`;
    connection.query(placeQuery, function (error, results, fields) {
        if (error) throw error;
        const place = results[0];
        // console.log(place);
        // console.log(id, place);

        // res.render("destinations.ejs", { place, id })
        res.render("details.ejs", { place, place_id });
    });
    // let data = placesMexico[id];

})


app.get('/mexico/:id/edit', (req, res) => {
    // rendering pepopulated form to edit the destination (Images URL must already exist in /public/photos folder)
    const { id } = req.params;
    let location = placesMexico[id];
    res.render('update.ejs', { location, id })
})


app.patch('/mexico/:id', (req, res) => {
    // updating information about given place in placesMexico.json file and redirecting to /mexico
    const { id } = req.params;
    let data = placesMexico[id];

    let updatedPlaceName = req.body.placeName;
    let updatedCity = req.body.city;
    let updatedState = req.body.state;
    let updatedDescription = req.body.description;
    let updatedImg = req.body.imgWide;
    let updatedSquareImg = req.body.img;

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

    if (updatedSquareImg != data.img) {
        console.log(`Old img - ${data.img}`);
        data.img = updatedSquareImg;
        console.log(`Updated img - ${data.img}`);
    };

    fs.writeFileSync('placesMexico.json', JSON.stringify(placesMexico), err => {
        if (err) {
            console.error(err)
            return
        }
    })
    placesMexico = fs.readFileSync('./placesMexico.json');
    res.redirect('/mexico')
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