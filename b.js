console.log('reqiure:',require);
module.exports = ()=>{
    console.log('fun from  require a :',require);
    const moduleA = require('./a')
    console.log(moduleA);
}