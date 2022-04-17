const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/destinations', (req, res) => {
    res.render('destinations.ejs')
})

app.listen(3000, () => {
    console.log("ON PORT 3000!")
})
