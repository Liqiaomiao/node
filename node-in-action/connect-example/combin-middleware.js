const connnect = require('connect')
const setUp = require('./setup')
const errorHandler = require('./errorHandler')
function logger (req, res, next) {
    console.log('%s %s', req.method, req.url)
    next()
    console.log('after next');
}

function hello (req, res) {
    console.log('hello')
    foo()
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello world')
}

connnect()
    .use(setUp(':method'))
    .use(hello)
    .use(errorHandler)
    .listen(3000)