const net = require('net')
const redis = require('redis')

const server = net.createServer(socket=>{
    const subscriber = redis.createClient() // 需要先链接redis redis-server
    subscriber.subscribe('main');
    subscriber.on('message',(channel,message)=>{
        socket.write(`Channel ${channel}:${message}`)
    })
    const publisher = redis.createClient()
    socket.on('data',data=>{
        console.log('get data',data)
        publisher.publish('main',data)
    })
    socket.on('end',()=>{
        subscriber.unsubscribe('main')
        subscriber.end(true)
        publisher.end(true)
    })
}).listen(3000)