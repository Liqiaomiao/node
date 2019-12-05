const fs = require('fs')
const zlib = require('zlib')
const gzip = zlib.createGzip();
const outStream = fs.createWriteStream('output.js.gz');

fs.createReadStream('../http_demo.js')
    .pipe(gzip)
    .pipe(outStream)