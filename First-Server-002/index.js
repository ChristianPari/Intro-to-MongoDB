require('dotenv').config();
const express = require('express'),
    morgan = require('morgan'),
    dbConnect = require('./dbConnection'),
    spacer = require('./spacer'),
    app = express(),
    port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.json());

dbConnect();

app.listen(port, () => {

    console.log(
        spacer(`Listening on port: ${port}`) +
        `\nListening on port: ${port}\n` +
        spacer(`Listening on port: ${port}`) +
        '\n')

});