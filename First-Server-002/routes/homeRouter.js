const express = require('express'),
    router = express.Router(),
    Movie = require('../models/Movie');

router.get('/test', (req, res) => {

    res.render('test', { titleVariable: 'Movie Home Page', subHead: "See Movies" });

});

router.get('/home', async(req, res) => {

    const allMovies = await Movie.find({}),
        clientMsg = "Available Movies";

    res.render('home', { titleVar: "Movie Rental Home", message: clientMsg, all_movies: allMovies });

});

router.get('/static', (req, res) => {

    res.sendFile(process.cwd() + '/public/homeStatic/old-homePage/home.html');

});

router.get('/movie/all', (req, res) => {

    Movie.find({})
        .then(allMovies => {

            return res.status(200).json({

                status: 200,
                message: 'All Movies within our Database',
                all_movies: allMovies

            });

        })
        .catch(err => {

            return res.status(500).json({

                status: 500,
                message: err.message,
                error: err

            })

        });



});

router.get('/movie/:id', (req, res) => {

    Movie.findById(req.params.id)
        .then(movie => {

            return res.status(200).json({

                status: 200,
                message: 'All Movies within our Database',
                movie_data: movie

            });

        })
        .catch(err => {

            return res.status(500).json({

                status: 500,
                message: err.message,
                error: err

            })

        });



});

router.get('/movie/available/:available', findAvail, (req, res) => {

    const movies = req.req_movies;
    let request = req.params.available;

    if (req.params.available == true) {

        request = 'available';

    } else {

        request = 'unavailable';

    }

    return res.status(200).json({

        status: 200,
        message: `These are our ${request} movies`,
        movies: movies

    });

});

router.post('/movie', async(req, res) => {

    try {

        const newMovie = new Movie(req.body);

        await Movie.create(newMovie);

        return res.status(201).json({

            status: 201,
            message: 'Successful Creation of a New Movie',
            new_movie: newMovie

        });

    } catch (err) {

        return res.status(500).json({

            status: 500,
            messgae: err.message,
            error: err

        });

    }

});

router.delete('/movie/:movie_id', findMovie, async(req, res) => {

    const movie = req.found_movie,
        movieID = req.params.movie_id;

    try {

        await Movie.deleteOne({ _id: movieID });

        return res.status(200).json({

            status: 200,
            message: 'Successful Movie Deletion',
            deleted_movie: movie

        });

    } catch (err) {

        return res.status(500).json({

            status: 500,
            message: err.message,
            error: err

        });

    }


});

router.patch('/movie/:movie_id', findMovie, validPatch, async(req, res) => {

    const oldMovie = req.found_movie,
        movieID = req.params.movie_id,
        updatedMovie = req.updated_movie;

    try {

        await Movie.findByIdAndUpdate(movieID, updatedMovie);

        return res.status(200).json({

            status: 200,
            message: 'Successful Movie Update',
            updated_movie: updatedMovie,
            old_movie: oldMovie

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

//* ############### Middleware ###############
async function findMovie(req, res, next) {

    const reqID = req.params.movie_id;

    try {

        req.found_movie = await Movie.findById(reqID);

    } catch (err) {

        return res.status(404).json({

            status: 404,
            message: 'Movie Not Found'

        });

    }

    if (req.found_movie == null) {

        return res.status(404).json({

            status: 404,
            message: 'Movie Not Found'

        });

    }

    next();

};

async function findAvail(req, res, next) {

    const request = req.params.available;

    try {

        req.req_movies = await Movie.find({ available: request });

    } catch (err) {

        return res.status(400).json({

            status: 400,
            message: err.message,
            error: err

        })

    }

    next();

};

async function validPatch(req, res, next) {

    const movieID = req.params.movie_id;

    try {

        const movie = await Movie.findById(movieID),
            updateData = req.body;

        for (const field in movie) {

            if (field == '_id') {

                return res.status(401).json({

                    status: 401,
                    message: 'You are not authorized to change the IDs of our movies, please make another request without the Movie ID',
                    unauth_field: '_id'

                })

            }

            if (updateData.hasOwnProperty(field)) {

                movie[field] = updateData[field];

            }

        }

        const updatedMovie = new Movie(movie);

        req.updated_movie = updatedMovie;

    } catch (err) {

        return res.status(500).json({

            status: 500,
            message: err.message,
            error: err

        })

    }

    next();

};