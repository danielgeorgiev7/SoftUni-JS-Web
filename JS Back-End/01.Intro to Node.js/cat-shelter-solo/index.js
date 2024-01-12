const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const rawDataCats = fs.readFileSync('./data/cats.json');
const cats = JSON.parse(rawDataCats);

const rawDataBreeds = fs.readFileSync('./data/breeds.json');
const breeds = JSON.parse(rawDataBreeds);

const views = {
    home: './views/home.html',
    style: './views/site.css',
    addCat: './views/addCat.html',
    addBreed: './views/addBreed.html',
    cat: './views/partials/cat.html',
    breed: './views/partials/breed.html',
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
        }, true);
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
        render(views.breed, breeds, (err, breedResult) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }
            render(views.addCat, { breeds: breedResult }, (err, result) => {
                res.writeHead(200, {
                    'content-type': 'text/html'
                });
                res.write(result);
                res.end();
            }, false);
        }, true);
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

            fs.writeFile('./data/cats.json', JSON.stringify(cats, null, 2), (err) => {
                if (err) {
                    console.error('Error writing to cats.json:', err);
                    res.statusCode = 500;
                    return res.end();
                }
                res.writeHead(302, {
                    'location': '/'
                });
                res.end();
            });
        });
    }
    else if (req.url === '/cats/add-breed' && req.method === "GET") {
        fs.readFile(views.addBreed, { encoding: 'utf-8' }, (err, result) => {
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
    else if (req.url === '/cats/add-breed' && req.method === "POST") {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('close', () => {
            const parsedBody = qs.parse(body);
            parsedBody.id = breeds[breeds.length - 1].id + 1;
            breeds.push(parsedBody);

            // Write to breeds.json
            fs.writeFile('./data/breeds.json', JSON.stringify(breeds, null, 2), (err) => {
                if (err) {
                    console.error('Error writing to breeds.json:', err);
                    res.statusCode = 500;
                    return res.end();
                }
                res.writeHead(302, {
                    'location': '/'
                });
                res.end();
            });
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

function render(view, data, callback, isArray) {
    fs.readFile(view, { encoding: 'utf-8' }, (err, result) => {
        if (err) {
            return callback(err);
        }
        let finalResult = '';
        if (isArray)
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