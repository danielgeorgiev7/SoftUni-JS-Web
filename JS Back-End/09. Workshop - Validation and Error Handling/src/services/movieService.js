const Movie = require('../models/Movie');


exports.getAll = () => {
    const movies = Movie.find();
    return movies;
}
exports.getOne = (movieId) => Movie.findById(movieId).populate('casts');

exports.create = (movieData) => Movie.create(movieData);

exports.attach = async (movieId, castId) => {
    // const movie = await this.getOne(movieId);

    // movie.casts.push(castId);

    // return movie.save();

    return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
}


exports.search = (title, genre, year) => {
    // let movieResults = await Movie.find().lean();
    let query = {};

    if (title) {
        // movieResults = movieResults.filter(movie => (movie.title).toLowerCase().includes(title.toLowerCase()));
        query.title = new RegExp(title, 'i');
    }

    if (genre) {
        // movieResults = movieResults.filter(movie => (movie.genre).toLowerCase().includes(genre.toLowerCase()));
        query.genre = genre.toLowerCase();
    }

    if (year) {
        // movieResults = movieResults.filter(movie => movie.year === year);
        query.year = year;
    }

    // return movieResults;
    return Movie.find(query);
}

exports.edit = (movieId, movieData) => Movie.findByIdAndUpdate(movieId, movieData);

exports.delete = (movieId) => Movie.findByIdAndDelete(movieId);