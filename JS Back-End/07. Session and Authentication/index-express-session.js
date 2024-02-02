const express = require('express');
const session = require('express-session');

const app = express();
app.use(session({
    secret: 'Victoria\'s Secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    if (req.session.userInfo) {
        res.send(`Hello ${req.session.userInfo.username}`);
    }
    else {
        res.send('Please Login!');
    }
});

app.get('/login', (req, res) => {
    res.send(`<form action="/login" method="post">
                <label for="username">Username</label>
                <input type="text" name="username" />
                <label for="password">Password</label>
                <input type="password" name="password" />
                <input type="submit" value="login" />
            </form>
            `);
});

app.post('/login', (req, res) => {
    req.session.userInfo = req.body;
    req.session.privateInfo = 'se mi e taq'

    res.end();
});

app.post('/logout', (req, res) => {
    res.session.destroy();
    res.end();
});

app.listen(5000, () => console.log('Server is listening on port 5000'))