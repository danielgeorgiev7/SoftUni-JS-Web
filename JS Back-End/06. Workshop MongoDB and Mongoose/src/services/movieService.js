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


exports.search = async ({ title, genre, year }) => {
    let movieResults = await Movie.find().lean();

    if (title) movieResults = movieResults.filter(movie => (movie.title).toLowerCase().includes(title.toLowerCase()));
    if (genre) movieResults = movieResults.filter(movie => (movie.genre).toLowerCase().includes(genre.toLowerCase()));
    if (year) movieResults = movieResults.filter(movie => movie.year === year);

    return movieResults;
}