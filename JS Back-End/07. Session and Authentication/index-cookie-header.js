const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const loginInfo = req.header('Cookie');

    if (loginInfo) {
        res.send(`Hello User: ${loginInfo.split('=').at(1)}!`);
    }
    else {
        res.send('Please Login!')
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
    console.log(req.body);

    res.header('Set-Cookie', `loginInfo=${req.body.username}`);

    res.end();
});

app.listen(5000, () => console.log('Server is listening on port 5000'))