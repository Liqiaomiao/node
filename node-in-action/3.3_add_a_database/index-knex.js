const express = require('express')
const db = require('./db-knex')
const bodyParser = require('body-parser')
const read = require('node-readability')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/articles', (req, res, next) => { // curl http://localhost:3000/articles/
    db().then(()=>{
        db.Article.all().then(data=>{
            res.send(data)
        })
    })
})
app.post('/articles', (req, res, next) => { // curl --data 'url=http://politics.people.com.cn/n1/2019/1214/c1001-31505998.html' http://localhost:3000/articles
    const url = req.body.url
    read(url, (err, result) => {
        db().then(()=>{
            db.Article.create({
                title: result.title,
                content: result.content
            }).then(()=>{
                db.Article.all().then(articles=>{
                    res.send(articles)
                })
            })
        }).catch(err=>{throw err})
    })

})
app.listen(3000, () => {
    console.log(`App started on port 3000`)
})