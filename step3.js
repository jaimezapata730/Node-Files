const fs = require('fs');
const process = require('process');
const axios = require('axios');

function optionalOutput(text, out) {
    if(out) {
        fs.writeFile(out, text, 'utf8', err => {
            if(err) {
                console.log(`Couldn't write ${out}: ${err}`);
            }
        });
    } else {
        console.log(text);
    }
}

function cat(path, out) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            console.log(data);
            optionalOutput(data, out);
        }
    });
}

async function webCat(url, out) {
    try {
        let resp = await axios.get(url);
        optionalOutput(resp.data, out);
    } catch(err) {
        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let out;

if (process.argv[2] == '--out') {
    out  = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0,4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}