const router = require("express").Router(),
    User = require("../models/User"),
    validateUser = require("../middleware/validateUser");

//@desc post/make a new user and store in users collection
//@path (server path)/user/post
//@access adminLevel [2]
router.post(
    '/post',
    validateUser,
    async(req, res) => {

        // not allow user to bypass admin level and isAdmin

        try {

            const newUser = await User.create(req.body);

            res.status(201).json({
                status: 201,
                message: "User Created",
                new_doc: newUser
            })

        } catch (err) {

            res.status(500).json({ message: err.message || err });

        };

    });

module.exports = router;