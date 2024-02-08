const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');

const app = express();
const port = 3000;

app.use(routes);

configHandlebars(app);
configExpress(app);

//TODO Change name here
mongoose.connect(`mongodb://localhost:27017/second-hand-electronics`)
    .then(() => {
        console.log('DB connection established');

        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    })
    .catch(err => console.error(err.message));