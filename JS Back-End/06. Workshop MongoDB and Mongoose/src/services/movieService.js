const Movie = require('../models/Movie');

const movies = [{
    _id: 1,
    title: "Harry Potter",
    genre: "Fantasy",
    director: "Chris Columbus",
    date: "2001",
    imageUrl: "https://m.media-amazon.com/images/I/51TFQYub8mL._AC_UF1000,1000_QL80_.jpg",
    rating: "5",
    description: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world. On his eleventh birthday, Harry Potter (Daniel Radcliffe) discovers that he is no ordinary boy.",

}];

exports.create = async (movieData) => {
    const result = await Movie.create(movieData);

    return result;
};

exports.getAll = () => {
    return [...movies];
}

exports.getOne = (movieId) => {
    const movie = movies.find(movie => movie._id == movieId);

    return movie;
}

exports.search = ({ title, genre, year }) => {
    let movieResults = movies.slice();

    if (title) movieResults = movieResults.filter(movie => (movie.title).toLowerCase().includes(title.toLowerCase()));
    if (genre) movieResults = movieResults.filter(movie => (movie.genre).toLowerCase().includes(genre.toLowerCase()));
    if (year) movieResults = movieResults.filter(movie => movie.year === year);

    return movieResults;
}