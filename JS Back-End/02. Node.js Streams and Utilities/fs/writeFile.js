const fs = require("fs");

fs.writeFile('./created.txt', 'Hello World', { encoding: 'utf8', flag: 'a' }, (error) => {
    if (error) {
        return;
    }
    console.log('File is created')
});