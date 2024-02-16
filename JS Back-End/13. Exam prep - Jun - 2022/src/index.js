const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');

const app = express();
const port = 3000;

configExpress(app);
configHandlebars(app);

app.use(routes);

mongoose.connect(`mongodb://localhost:27017/crypto-trade`)
    .then(() => {
        console.log('DB connection established');

        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    })
    .catch(err => console.error(err.message));