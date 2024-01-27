const Movie = require('../models/Movie');


exports.getAll = () => {
    const movies = Movie.find();
    return movies;
}
exports.getOne = (movieId) => Movie.findById(movieId);

exports.create = (movieData) => Movie.create(movieData);

exports.search = async ({ title, genre, year }) => {
    let movieResults = await Movie.find().lean();

    if (title) movieResults = movieResults.filter(movie => (movie.title).toLowerCase().includes(title.toLowerCase()));
    if (genre) movieResults = movieResults.filter(movie => (movie.genre).toLowerCase().includes(genre.toLowerCase()));
    if (year) movieResults = movieResults.filter(movie => movie.year === year);

    return movieResults;
}