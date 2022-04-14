const express = require('express');
const app = express();

app.get('/mexico', (req, res) => {
    res.send("GET /mexico reponse. Where are my churros?!")
})

app.listen(3000, () => {
    console.log("ON PORT 3000!")
})
