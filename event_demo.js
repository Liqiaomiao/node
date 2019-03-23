const { EventEmitter}=require('events')
class MyEmitter extends EventEmitter{}
const emitter = new MyEmitter()
function login() {
    console.log(1);
}

console.log(2);
emitter.on('login',login)
console.log(3);
emitter.emit('login')
console.log(4);
