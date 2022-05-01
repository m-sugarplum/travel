const express = require('express');
const app = express();
const path = require('path');
// change location of placesMexico to not overwrite it every time the app runs
const placesMexico = {
    '1': {
        placeName: 'San Cristóbal de las Casas',
        city: 'San Cristóbal de las Casas',
        state: 'Chiapas',
        description: 'Description for San Cristobal comes here',
        img: 'https://images.unsplash.com/photo-1593374419603-bf046ae3a497?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    '2': {
        placeName: 'Lagunas de Montebello',
        city: 'Comitán',
        state: 'Chiapas',
        description: 'Description for Lagunas de Montebello comes here',
        img: 'https://images.unsplash.com/photo-1584315450960-7ebef8d0b179?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
    },
    '3': {
        placeName: 'Lagos de Colon',
        city: 'Lagos de Colon',
        state: 'Chiapas',
        description: 'Description for Lagos de Colon comes here',
        img: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    '4': {
        placeName: 'Cascada El Chiflon',
        city: 'San Vicente La Mesilla',
        state: 'Chiapas',
        description: 'Description for Cascada El Chiflon comes here',
        img: 'https://images.unsplash.com/photo-1554296109-fb7a6c8af84c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    '5': {
        placeName: 'Palenque',
        city: 'Palenque',
        state: 'Chiapas',
        description: 'Description for Palenque comes here',
        img: 'https://images.unsplash.com/photo-1583684894818-b85e49a78a62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
    },
    '6': {
        placeName: 'la Selva Lacandona',
        city: 'Montes Azules Biosphere Reserve',
        state: 'Chiapas',
        description: 'Description for la Selva Lacandona comes here',
        img: 'https://images.unsplash.com/photo-1570108691072-d03b433fc8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
    },
    '7': {
        placeName: 'Cancun',
        city: 'Cancún',
        state: 'Quintana Roo',
        description: 'Description for Cancun comes here',
        img: 'https://images.unsplash.com/photo-1552442331-e2a1c86d7224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
    },
    '8': {
        placeName: 'Mazatlán',
        city: 'Mazatlán',
        state: 'Sinaloa',
        description: 'Description for Mazatlan comes here',
        img: 'https://images.unsplash.com/photo-1519837242121-561f79e8e7e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    },
}
const listOfPlaces = Object.keys(placesMexico);
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
    const listOfPlaces = Object.keys(placesMexico);
    const numOfPlaces = listOfPlaces.length;
    res.render('destinations.ejs', { placesMexico, listOfPlaces, numOfPlaces });
})


app.post('/mexico', (req, res) => {
    res.send("IT WORKED!");
    const dataId = (numOfPlaces + 1).toString();
    placesMexico[dataId] = req.body;
    console.log(placesMexico);
    numOfPlaces += 1;
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

