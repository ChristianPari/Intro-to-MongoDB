const mongoose = require('mongoose'),
    User = require('../models/User'),
    express = require('express'),
    router = express();

router.post('/', async(req, res) => {

    try {

        const newUser = new User(req.body);

        await newUser.save();

        return res.status(201).json({

            status: 201,
            message: 'User Created',
            new_user: newUser

        })

    } catch (error) {

        return res.status(500).json({

            status: 500,
            message: error.message,
            error: error

        })

    }

});

router.get('/:user_id', findUser, async(req, res) => {

    if (!req.foundUser) {

        return res.status(404).json({

            status: 404,
            message: 'No User Found'

        });

    }

    return res.status(200).json({

        status: 200,
        message: 'Successfully Found User',
        user_data: req.foundUser

    });

});

module.exports = router;

//* ############### Middleware for only User Route ###############
async function findUser(req, res, next) {

    const userID = req.params.user_id;

    req.foundUser = await User.find({ _id: userID });

    next();

};