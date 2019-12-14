const express = require('express')
const Article = require('./db').Article
const bodyParser = require('body-parser')
const read = require('node-readability')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
console.log(Article)
app.get('/articles', (req, res, next) => { // cur http://localhost:3000/articles/
    Article.all((err, articles) => {
        if (err) return next(err)

        res.format({
            html: () => {
                res.render('articles.ejs', { articles: articles });
            },
            json: () => {
                res.send(articles);
            }
        })
    })
})
app.post('/articles', (req, res, next) => { // curl --data 'url=http://politics.people.com.cn/n1/2019/1214/c1001-31505998.html' http://localhost:3000/articles
    const url = req.body.url
    read(url, (err, result) => {
        if (err || !result) res.status(500).send('error downloading articles')
        Article.create({
            title: result.title, content: result.content
        }, (err, article) => {
            if (err) return next(err)
            res.send('ok')
        })
    })
})
app.get('/articles/:id', (req, res, next) => { // curl  http://localhost:3000/articles/1
    Article.find(req.params.id, (err, article) => {
        if (err) next(err)
        res.send(article)
    })
})
app.delete('/articles/:id', (req, res, next) => { // curl -X DELETE http://localhost:3000/articles/1
    Article.delete(req.params.id, (err, article) => {
        if (err) return next(err);
        res.send({ message: 'Deleted' });
    })
})
app.listen(3000, () => {
    console.log(`App started on port 3000`)
})