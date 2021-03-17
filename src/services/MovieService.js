const movies = require('../models/Movies');

const addMovie = async (request) => {
    try {
        console.log(request)
        if (request) {
            let isMoviePresent = await check(request.name)
            if (!isMoviePresent) {
                let movieObject = await movies.create({
                    name: request.name,
                    year: request.year,
                    director: request.director
                });
                await movieObject.save();
                return movieObject;
            }
            else {
                throw new Error("Movie is already present.")
            }
        }
    } catch (error) {
        console.log('Error in creating movie', error.message)
        throw error;
    }
}

const addMovies = async (request) => {
    try {
        console
        if (request) {
            let movieObject = await movies.insertMany(request);
            return movieObject;
        }
    } catch (error) {
        console.log('Error in creating movies', error.message)
        throw error;
    }
}

const getMovies = async (req) => {
    try {
        let searchObj = [];
        searchObj = [{
            name: { '$regex': `${req.query.query}`, '$options': 'i' }
        },
        {
            year: { '$regex': `${req.query.query}`, '$options': 'i' }
        },
        {
            director: { '$regex': `${req.query.query}`, '$options': 'i' }
        }]
        let lMovies = await movies.find({ $or: searchObj });

        return lMovies;
    } catch (error) {
        console.log('error occurred in fetching user', error)
        throw error;
    }

}

const check = async (movieName) => {
    let found = false;
    try {
        let lMovies = await movies.findOne({
            name: movieName
        });
        if (lMovies) {
            found = true;
        }
        return found
    } catch (error) {
        return found;
    }
}



module.exports = {
    check,
    addMovie,
    addMovies,
    getMovies
}