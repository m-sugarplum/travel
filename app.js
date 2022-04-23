const express = require('express');
const app = express();
const path = require('path');
const destinationsMexico = require('./mexico-destinations.json');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

// let destinationsMexico = ['San Cristóbal de las Casas', 'Parque Nacional Lagunas de Montebello', 'Lagos de Colón',
//     'Cascada El Chiflón', 'Palenque', 'La Selva Lacandona', 'Cancún', 'Mazatlán', 'Acapulco', 'Santuario de la Mariposa Monarca',
//     'Huasteca potosina', 'León', 'Tequila', 'El Cañón del Sumidero']

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/destinations', (req, res) => {
    const destinations = destinationsMexico;
    const listOfPlaces = Object.keys(destinationsMexico);
    const numOfPlaces = listOfPlaces.length;
    console.log(numOfPlaces)
    // console.log(places.Cancun.img)
    res.render('destinations.ejs', { destinations, listOfPlaces, numOfPlaces });
})

app.get('/destinations/:name', (req, res) => {
    const { name } = req.params;
    const data = destinationsMexico[name];
    res.render('details.ejs', { data, name })
})
app.listen(8080, () => {
    console.log("ON PORT 8080!")
})
