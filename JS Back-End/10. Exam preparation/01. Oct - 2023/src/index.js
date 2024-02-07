const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(routes);

mongoose.connect(`mongodb://localhost:27017/second-hand-electronics`)
    .then(() => {
        console.log('DB connection established');

        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    })
    .catch(err => console.error(err.message));