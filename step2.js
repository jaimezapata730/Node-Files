const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp, data);
    } catch(err) {
        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

const path = process.argv[2];

if (path.slice(0,4) === 'http') {
    webCat(path);
} else {
    cat(path);
}