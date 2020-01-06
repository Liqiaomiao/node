const ejs = require('ejs')
const fs = require('fs')
const http= require('http')
const filename = './templates/students.ejs'
const students = [
    {name:'Rick Larue',age:23},
    {name:'Sarah Cathands',age:25},
    {name:'Bob Dobbs',age:37}
]
const cache = process.env.NODE_ENV === 'production'
const server = http.createServer((req,res)=>{
    if(req.url='/'){
        fs.readFile(filename,(err,data)=>{
            const template = data.toString()
            const context = {students}
            // const output = ejs.render(template,context)
            const output = ejs.render(
                template,
                {
                    students,
                    cache,
                    filename
                }
            )
            res.setHeader('Content-type','text/html')
            res.end(output)
        })
    }
}).listen(8000)