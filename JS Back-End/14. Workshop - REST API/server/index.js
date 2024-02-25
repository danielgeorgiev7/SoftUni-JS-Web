const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost/:3000'); // CORS

//     next();
// });

app.use(cors());
app.use(express.json());

app.use(routes);

mongoose.connect('mongodb://localhost:27017/furniture-2024')
    .then(() => console.log('DB connection established!'));

app.get('/data/catalog', (req, res) => {
    res.json([]);
});

app.listen(3030, () => console.log('Server is running on port 3030...'));

