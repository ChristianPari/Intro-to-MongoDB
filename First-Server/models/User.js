const validator = require('validator'),
    mongoose = require('mongoose'),
    UserSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: value => {

                if (!validator.isEmail(value)) {

                    throw new Error('Email is invalid');

                }

            }
        }
    });

const Model = mongoose.model('User', UserSchema);

module.exports = Model;