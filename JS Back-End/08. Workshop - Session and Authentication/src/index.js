const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

configHandlebars(app);
configExpress(app);

app.use(routes);

mongoose.connect(`mongodb://localhost:27017/magic-movies`)
    .then(() => {
        console.log('DB connection established');

        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    })
    .catch(err => console.error(err.message));