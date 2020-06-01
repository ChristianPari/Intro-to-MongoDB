require('dotenv').config();
const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    morgan = require("morgan"),
    port = process.env.PORT || 3000,
    mongoURI = process.env.MONGO_URI,
    spacer = '-';

app.use(morgan("dev")); // used to display to the server console the requests being made
app.use(express.json()); // parses JSON data

app.get('/', (req, res) => { // create a homeRouter

    res.send('Home Route');

});

const userRouter = require('./routes/userRouter');

app.use('/user', userRouter);

//! CONNECTION CAN BE STORED IN OWN FILE
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('open', () => {

    console.log(
            spacer.repeat(('Connection Established to Database').length) +
            '\nConnection Established to Database\n' +
            spacer.repeat(('Connection Established to Database').length)) +
        '\n';

});

mongoose.connection.on('error', (err) => {

    console.log(
        spacer.repeat((`Error: ${err.message}`).length) +
        `\nError: ${err.message}\n` +
        spacer.repeat((`Error: ${err.message}`).length) +
        '\n');

});

mongoose.connection.on('connected', () => {

    console.log(
        spacer.repeat(('Database Connecting to:').length) +
        `\nDatabase Connecting to:\n${mongoURI}\n` +
        spacer.repeat(('Database Connecting to:').length) +
        '\n');

});

mongoose.connection.on('disconnected', () => {

    console.log(
        spacer.repeat(('The Application disconnected from the database').length) +
        'The Application disconnected from the database' +
        spacer.repeat(('The Application disconnected from the database').length) +
        '\n');

});

app.listen(port, () => {

    console.log(
        spacer.repeat((`Listening on port:${port}`).length) +
        `\nListening on port:${port}\n` +
        spacer.repeat((`Listening on port:${port}`).length) +
        '\n')

});