const events = require('events')
const myEmitter = new events.EventEmitter()
const http = require('http')
myEmitter.on('error', err => {
    console.log(`error:${ err.message }`)
})
myEmitter.emit('error', new Error('something is wrong'))

