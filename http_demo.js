const http = require('http')
const qs = require('querystring')
const url = require('url')
const server = http.createServer()
let user = []
server.on('request',(request,response)=>{
   const qureyurl = url.parse(request.url).pathname;
   const method = request.method;
   const qureystring = url.parse(request.url,true).query
    switch (qureyurl) {
       case '/user':
           switch (method) {
               case 'GET':
                   let result= user.find(u=>{
                       return u.name===qureystring.name
                   })
                   response.end(JSON.stringify(result))
                   break
               default:
                   response.setHeader('Content-Type','application/json')
                       let data = ''
                        request.on('data',(u)=>{
                            data+=u.toString()
                        })
                       request.on('end',(err)=>{
                           try {
                               console.log(data);
                               user.push(JSON.parse(data))
                               response.end(JSON.stringify({data:'添加成功'}))
                           }
                       catch (e) {
                               response.statusCode = 400
                               response.end( JSON.stringify({errmsg:'请传入json格式的数据'}))
                           }

                       })

                   break
           }
           break;
       default:
           response.statusCode = 404;
           response.end('请检查您的地址是否正确')

   }
   const contenttype = request.headers['content-type']
 /*   switch (contenttype) {
        case 'text/plain':{
            response.setHeader('Content-Type','application/json')
            let str = "";
            request.on('data',(data)=>{
                console.log(data);
                str+=data.toString('utf-8')
            })
            request.on('end',()=>{
                response.end(JSON.stringify({data:`you sent plain text:${str}`}))
            })
            break
        }

        case 'application/json':
            response.end('you send json')
            break
        case 'application/x-www-form-urlencoded':{
            response.setHeader('Content-Type','application/x-www-form-urlencoded')
            let str = "";
            request.on('data',(data)=>{

                str+=data.toString('utf-8')
            })
            request.on('end',()=>{
                let test = qs.stringify(qs.parse(str))
                response.end(test)
            })
            break
        }

        default:
            response.end('hi')
            break
    }*/


})
server.listen(3000,()=>{
    console.log('listening');
})