module.exports = {demo1:'from a'}
console.log('before require');
console.log('module.exports:',module.exports);
const moduleB = require('./b')
console.log('after require');
module.exports.abc = Math.random()
console.log(moduleB());