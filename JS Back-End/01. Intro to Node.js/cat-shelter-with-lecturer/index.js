const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const cats = [
    {
        id: 1,
        name: "Whiskers",
        imageUrl: "https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg",
        breed: "Bombay Cat",
        description: "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
    },
    {
        id: 2,
        name: "Mittens",
        imageUrl: "https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg",
        breed: "Bombay Cat",
        description: "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
    },
    {
        id: 3,
        name: "Shadow",
        imageUrl: "https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348_1280.jpg",
        breed: "Bombay Cat",
        description: "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
    },
    {
        id: 4,
        name: "Luna",
        imageUrl: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg",
        breed: "Bombay Cat",
        description: "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
    },
    {
        id: 5,
        name: "Oreo",
        imageUrl: "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
        breed: "Bombay Cat",
        description: "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
    }
];

const views = {
    home: './views/home.html',
    style: './views/site.css',
    addCat: './views/addCat.html',
    cat: './views/partials/cat.html',
}

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        render(views.cat, cats, (err, catResult) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }
            render(views.home, { cats: catResult }, (err, result) => {
                res.writeHead(200, {
                    'content-type': 'text/html'
                });
                res.write(result);
                res.end();
            }, false);
        }, true)
    }
    else if (req.url === '/styles/site.css') {
        fs.readFile(views.style, { encoding: 'utf-8' }, (err, result) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }
            res.writeHead(200, {
                'content-type': 'text/css'
            });
            res.write(result);
            res.end();
        });

    }
    else if (req.url === '/cats/add-cat' && req.method === "GET") {
        fs.readFile(views.addCat, { encoding: 'utf-8' }, (err, result) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            res.write(result);
            res.end();
        });
    }
    else if (req.url === '/cats/add-cat' && req.method === "POST") {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('close', () => {
            const parsedBody = qs.parse(body);
            parsedBody.id = cats[cats.length - 1].id + 1;
            cats.push(parsedBody);
            res.writeHead(302, {
                'location': '/'
            });
            res.end();
        });
    }
    else {
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        res.write('<h1>404</h1>');
        res.end();
    }


});

function render(view, data, callback, forEachBool) {
    fs.readFile(view, { encoding: 'utf-8' }, (err, result) => {
        if (err) {
            return callback(err);
        }
        let finalResult = '';
        if (forEachBool)
            data.forEach(function (dataEl) {
                const htmlResult = Object.keys(dataEl).reduce((acc, key) => {
                    const pattern = new RegExp(`{{${key}}}`, 'g');
                    return acc.replace(pattern, dataEl[key]);
                }, result);
                finalResult += htmlResult;
            });
        else {
            const htmlResult = Object.keys(data).reduce((acc, key) => {
                const pattern = new RegExp(`{{${key}}}`, 'g');
                return acc.replace(pattern, data[key]);
            }, result);
            finalResult = htmlResult;
        }
        callback(null, finalResult);
    });
}

server.listen(5000);
console.log('Server is listening on port 5000...');