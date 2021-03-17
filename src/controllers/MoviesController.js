const MovieService = require('../services/MovieService');

const addMovie = async (req, res) => {
    try {
        const request = {
            name: req.body.name,
            year: req.body.year,
            director: req.body.director
        }

        const resp = await MovieService.addMovie(request);
        if (resp) {
            res.send({ statusCode: 200, message: "Movie added successfully", object: resp._doc });
        } else {
            res.send({ statusCode: 200, message: 'Failed to add new movie' });
        }
    } catch (error) {
        res.send({ statusCode: 500, errorMsg: error.message });
    }
};

const addMovies = async (req, res) => {
    try {
        if (req && req.body) {
            const movie = await MovieService.addMovies(req.body);
            if (movie) {
                res.send({ statusCode: 200, message: "Movies added successfully", object: movie._doc });
            } else {
                res.send({ statusCode: 400, message: "Failed to add new movie", object: {} });
            }
        } else {
            res.send({
                statusCode: 400,
                message: 'Invalid request parameters'
            });
        }
    } catch (error) {
        res.send({ statusCode: 500, errorMsg: error.message });
    }
};

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const getMovies = async (req, res) => {
    try {
        let lMovies = await MovieService.getMovies(req);
        if (lMovies && lMovies.length) {
            res.send({ statusCode: 200, message: "Movies added successfully", object:lMovies });
        } else {
            res.send({ statusCode: 200, message: "Movie is not in inventory.", object: []});
        }
    } catch (error) {
        res.send({ statusCode: 500, errorMsg: error.message });
    }
}



module.exports = {
    addMovie,
    addMovies,
    getMovies
}
