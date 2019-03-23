const http = require('http')
const server = http.createServer();
server.on('request',(request,response)=> {
    const {method, url, headers} = request
    const options = {
        host: 'news.baidu.com',
        method,
        path: url
    }
    console.log(options);
    const reqSent =  http.request(options, (resRec) => {
        const resHeaders = resRec.headers;
        const ks = Object.keys(resHeaders)
        for (const k of ks) {
            response.setHeader(k, resHeaders[k])
        }
        resRec.on('data', (data) => {
            response.write(data)
        })
        resRec.on('end',()=>{
            response.end()
        })
        resRec.on('error',(err)=>{
            console.log(err);
        })

    })
    request.on('data',(data)=>{
        console.log('发送',data);
        reqSent.write(data)
    })
    request.on('end',()=>{
        reqSent.end()
    })
})
server.on('error',err => {
    console.log(err);
})
server.listen(8990)