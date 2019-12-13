const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const articles = [{ title: 'example' }]
app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json()) // supports request bodies encoded as JSON
app.use(bodyParser.urlencoded({ extended: true })) // supports form-encoded bodies
// get all articles
app.get('/articles', (req, res, next) => { // curl http://localhost:3000/articles
    res.send(articles)
})

// creates an article
app.post('/articles', (req, res, next) => { // curl --data "title=examples 2" http://localhost:3000/articles
    const article = { title: req.body.title }
    articles.push(article)
    res.send(article)
})

// get a single article
app.get('/articles/:id', (req, res, next) => { // curl http://localhost:3000/articles/0
    const { id } = req.params
    console.log('fetching:', id)
    res.send(articles[id])

})
// deletes an article
app.delete('/articles/:id', (req, res, next) => { // curl -X DELETE http://localhost:3000/articles/0
    const { id } = req.params;
    console.log('deleting', id)
    delete articles[id]
    res.send({ message: 'deleted' })
})
app.listen(app.get('port'),()=>{
    console.log('app started on port',app.get('port'))
})