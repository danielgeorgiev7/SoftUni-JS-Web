const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

const secret = 'sdadasdsadsadsadsaxzccxzzxczxccz'

const db = {};

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    const token = req.cookies['auth'];

    if (!token) {
        res.send('Please Login!')
    }

    try {
        const decodedToken = jwt.verify(token, secret);
        res.send(`Welcome, ${decodedToken.username}`);
    }
    catch (err) {
        res.status(403).send('Unauthorized');
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

app.post('/login', async (req, res) => {
    res.cookie('user', req.body.username);

    const hash = db[req.body.username];

    if (!hash) {
        return res.status(401).end();
    }

    const isValid = await bcrypt.compare(req.body.password, hash);

    if (!isValid) {
        res.status(401).send('Unauthorized');
    }

    const payload = { username: req.body.username }

    const token = jwt.sign(payload, secret, { expiresIn: '2h' });

    res.cookie('auth', token, { httpOnly: true });

    res.send('Logged in successfully');

    res.end();
});

app.get('/register', (req, res) => {
    res.send(`<form action="/register" method="post">
                <label for="username">Username</label>
                <input type="text" name="username" />
                <label for="password">Password</label>
                <input type="password" name="password" />
                <input type="submit" value="login" />
            </form>
            `);
});

app.post('/register', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 12);

    db[req.body.username] = hash;

    res.redirect('/login');
});

app.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/login');
    res.end();
});

app.listen(5000, () => console.log('Server is listening on port 5000'))