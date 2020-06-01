const mongoose = require('mongoose'),
    User = require('../models/User'),
    express = require('express'),
    router = express();

router.get('/', (req, res) => {

    User.find({})
        .then(allUsers => {

            return res.status(200).json({

                status: 200,
                message: 'All Users in Database',
                users: allUsers

            });

        }).catch(err => {

            res.status(500).json({

                status: 500,
                error: err.message

            });

        });

});

router.get('/:user_id', findUser, (req, res) => {

    return res.status(200).json({

        status: 200,
        message: 'Successfully Found User',
        user_data: req.foundUser

    });

});

router.post('/', async(req, res) => {

    try {

        const newUser = new User(req.body);

        await newUser.save();

        return res.status(201).json({

            status: 201,
            message: 'User Created',
            new_user: newUser

        })

    } catch (err) {

        return res.status(500).json({

            status: 500,
            message: err.message,
            error: err

        })

    }

});

router.delete('/:user_id', findUser, async(req, res) => {

    const userID = req.params.user_id;

    try {

        await User.deleteOne({ _id: userID });

        return res.status(200).json({

            status: 200,
            message: 'User Successfully Removed from the Database',
            removed_user: req.foundUser

        });


    } catch (err) {

        return res.status(500).json({

            status: 500,
            message: err.message,
            error: err

        });

    }

});

router.patch('/:user_id', findUser, validatePatch, async(req, res) => {

    const userID = req.params.user_id,
        newData = req.body,
        oldUser = req.foundUser;

    try {

        await User.findByIdAndUpdate(userID, newData);

        return res.status(200).json({

            status: 200,
            message: 'User Successfully Updated',
            updated_user: await User.findById(userID),
            old_user: oldUser

        });

    } catch (err) {

        return res.status(500).json({

            status: 500,
            message: err.message,
            error: err

        });

    }

});

module.exports = router;

//* ############### Middleware for only User Route ###############
async function findUser(req, res, next) {

    const userID = req.params.user_id;

    try {

        req.foundUser = await User.findById(userID);

    } catch {

        return res.status(404).json({

            status: 404,
            message: 'User Not Found'

        });

    }

    if (req.foundUser.length == 0) {

        return res.status(404).json({

            status: 404,
            message: 'User Not Found'

        });

    }

    next();

};

function validatePatch(req, res, next) {

    const newData = req.body,
        emptyFields = [];

    for (const field in newData) {

        if (!newData[field].length) {

            emptyFields.push(field);

        }

    }

    if (emptyFields.length != 0) {

        const fields = emptyFields.join(', ');

        return res.status(400).json({

            status: 400,
            message: `Invalid values for fields: ${fields}`

        });

    }

    next();

};