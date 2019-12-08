const events = require('events')
const net = require('net')
const channel = new events.EventEmitter()
channel.clients = {}
channel.subscription = {}
channel.on('join', function (id, client) {
    this.clients[id] = client
    this.subscription[id] = (senderId, message) => {
        if (id !== senderId) {
            client.write(message)
        }
    }
    this.on('boardcast', this.subscription[id])
})
channel.on('leave', function (id) {
    channel.removeListener('boardcast', this.subscription[id])
    channel.emit('boardcast', id, `${ id } has left the chartroom. \n`)
})
const server = net.createServer(client => {
    const id = `${ client.remoteAddress }:${ client.remotePort }`
    channel.emit('join', id, client)
    client.on('data', (data) => {
        channel.emit('boardcast', id, data)
    })
    client.on('close', () => {
        channel.emit('leave', id)
    })
})
server.listen(8888)