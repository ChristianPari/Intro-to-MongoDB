require('dotenv').config();
const express = require('express'),
    app = express(),
    morgan = require("morgan"),
    port = process.env.PORT || 3000,
    dbConnection = require('./dbConnection'),
    spacer = '-';

app.use(morgan("dev")); // used to display to the server console the requests being made
app.use(express.json()); // parses JSON data

const homeRouter = require('./routes/homeRouter'),
    userRouter = require('./routes/userRouter');

app.use('/', homeRouter);
app.use('/user', userRouter);

dbConnection(); // function to establish connection to the DB

app.listen(port, () => {

    console.log(
        spacer.repeat((`Listening on port:${port}`).length) +
        `\nListening on port:${port}\n` +
        spacer.repeat((`Listening on port:${port}`).length) +
        '\n')

});