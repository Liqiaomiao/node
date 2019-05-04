const net = require('net');
const server = net.createServer(socket => {
    socket.on('data',data => {
        console.log('getting data:',data);
        socket.write(data) //
    })
    socket.write('hello')
})
server.listen(8888,function () {
    console.log('opened server on', server.address());
})