const net = require('net')
const server = net.createServer()
server.on('connection',(socket)=>{
    socket.on('data',(data)=>{
        socket.write('hi ,i received your message')
    })
    socket.write('net connected')
})
server.listen('/tmp/echo.sock')