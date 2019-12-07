const http = require('http')
const fs = require('fs')
http.createServer((req, res) => {
    getTitle(res)
}).listen(8000, () => {
    console.log('server is running at http://localhost:8000')
})
// 创建中间函数减少嵌套
function getTitle (res) {
    fs.readFile('./titles.json', (err, data) => {
        if (err) return handleError(err, res) // 通过尽早返回减少嵌套
        getTemplate(JSON.parse(data.toString()), res)
    })
}

function getTemplate (titles, res) {
    fs.readFile('./template.html', (err, data) => {
        if (err) return handleError(err, res)
        formatHtml(titles, data.toString(), res)
    })
}

function formatHtml (titles, template, res) {
    const html = template.replace('%', titles.join('</li><li>'))
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(html)
}

function handleError (err, res) {
    console.log(err)
    res.end('Server Error')
}