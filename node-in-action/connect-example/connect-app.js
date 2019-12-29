const app = require('connect')()
app.use((req, res, next) => { // use 组合中间件
    res.end('hello world!')
})
app.listen(3000)