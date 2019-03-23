const http = require('http')
const fs = require('fs')
const request = http.request({
    host:'www.baidu.com',
    path:'/'
},(response)=>{
    let str = ''
    response.on('data',(data)=>{
        str += data.toString()
    })
    response.on('end',()=>{
        fs.appendFile('./baidu.html',str,()=>{})
    })

})
request.end()

