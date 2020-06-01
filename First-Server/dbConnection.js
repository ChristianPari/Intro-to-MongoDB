const mongoose = require('mongoose'),
    mongoURI = process.env.MONGO_URI,
    spacer = '-';

function dbConnection() {

    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
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

};

module.exports = dbConnection;