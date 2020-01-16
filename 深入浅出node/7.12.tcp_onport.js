const net = require('net')
// const server = net.createServer((socket)=>{
//     socket.on('data',(data)=>{
//         socket.write('hi ,i received your message')
//     })
//     socket.on('end',()=>{
//         console.log('Link over');
//     })
//     socket.write('net connected')
// })
const server = net.createServer()
server.on('connection',(socket)=>{
    socket.on('data',(data)=>{
        socket.write('hi ,i received your message')
    })
    socket.write('net connected')
})
server.listen(8124,()=>{
    console.log('server bound');
})