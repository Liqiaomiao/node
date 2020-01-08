const pug = require('pug')
const fs = require('fs')
const http= require('http')
const Path = require('path')
const templagteFile = './templates/page.pug'
const iterTemplate = fs.readFileSync(templagteFile)
const context = {
    messages:[
        'you have logged in successfully',
        'welocom back'
    ]
}
const iterFn = pug.compile(iterTemplate,{filename:templagteFile})
http.createServer((req, res) => {
    if (req.url === '/jq.js') {
        fs.createReadStream(Path.resolve(__dirname, './templates' + req.url)).pipe(res);
    } else if (req.url === '/') {
        res.end(iterFn(context))
    }
}).listen(3000)